using DevExpress.AspNetCore;
using DevExpress.DashboardAspNetCore;
using DevExpress.DashboardCommon;
using DevExpress.DashboardWeb;
using DevExpress.DataAccess.ConnectionParameters;
using DevExpress.DataAccess.Excel;
using DevExpress.DataAccess.Sql;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;
using System.Data;

namespace AspNetCoreDashboardBackend {
    public class Startup {
        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment) {
            Configuration = configuration;
            FileProvider = hostingEnvironment.ContentRootFileProvider;
        }

        public IConfiguration Configuration { get; }
        public IFileProvider FileProvider { get; }

        public void ConfigureServices(IServiceCollection services) {
            services
                // Configures CORS policies.                
                .AddCors(options => {
                    options.AddPolicy("CorsPolicy", builder => {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyMethod();
                        builder.WithHeaders("Content-Type");
                    });
                })
                .AddDevExpressControls()                
                .AddControllersWithViews();
            services.AddScoped<DashboardConfigurator>((IServiceProvider serviceProvider) => {				
                DashboardConfigurator configurator = new DashboardConfigurator();
                configurator.SetConnectionStringsProvider(new DashboardConnectionStringsProvider(Configuration));
                DashboardFileStorage dashboardFileStorage = new DashboardFileStorage(FileProvider.GetFileInfo("App_Data/Dashboards").PhysicalPath);
				configurator.SetDataSourceStorage(CreateDataSourceStorage());
                configurator.SetDashboardStorage(dashboardFileStorage);

                configurator.DataLoading += Configurator_DataLoading;
				configurator.ConfigureDataConnection += Configurator_ConfigureDataConnection;

                return configurator;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            // Registers the DevExpress middleware.            
            app.UseDevExpressControls();
            // Registers routing.
            app.UseRouting();
            // Registers CORS policies.
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints => {
                // Maps the default controller/action to display the service info view.
                endpoints.MapDefaultControllerRoute();
                // Maps the dashboard route.
                EndpointRouteBuilderExtension.MapDashboardRoute(endpoints, "api/dashboard", "DefaultDashboard");
                // Requires CORS policies.
                endpoints.MapControllers().RequireCors("CorsPolicy");
            });
        }
        public DataSourceInMemoryStorage CreateDataSourceStorage() {
            DataSourceInMemoryStorage dataSourceStorage = new DataSourceInMemoryStorage();

			DashboardSqlDataSource sqlDataSource = new DashboardSqlDataSource("SQL Data Source", "NWindConnectionString");
			sqlDataSource.DataProcessingMode = DataProcessingMode.Client;
			SelectQuery query = SelectQueryFluentBuilder
				.AddTable("Categories")
				.Join("Products", "CategoryID")
				.SelectAllColumns()
				.Build("Products_Categories");
			sqlDataSource.Queries.Add(query);
			dataSourceStorage.RegisterDataSource("sqlDataSource", sqlDataSource.SaveToXml());
			
			DashboardExcelDataSource energyStatistics = new DashboardExcelDataSource("Energy Statistics");
            energyStatistics.ConnectionName = "energyStatisticsDataConnection";
            energyStatistics.SourceOptions = new ExcelSourceOptions(new ExcelWorksheetSettings("Map Data"));
			dataSourceStorage.RegisterDataSource("energyStatisticsDataSource", energyStatistics.SaveToXml());
			
            DashboardJsonDataSource jsonDataSourceSupport = new DashboardJsonDataSource("Support");
            jsonDataSourceSupport.RootElement = "Employee";            
			dataSourceStorage.RegisterDataSource("jsonDataSourceSupport", jsonDataSourceSupport.SaveToXml());
			
            DashboardJsonDataSource jsonDataSourceCategories = new DashboardJsonDataSource("Categories");            
            dataSourceStorage.RegisterDataSource("jsonDataSourceCategories", jsonDataSourceCategories.SaveToXml());
			
			DashboardObjectDataSource objDataSource = new DashboardObjectDataSource("Gantt Data", typeof(TasksData));
			objDataSource.DataId = "odsTaskData";
			dataSourceStorage.RegisterDataSource("objectDataSource", objDataSource.SaveToXml());
			
            return dataSourceStorage;
        }
        private void Configurator_ConfigureDataConnection(object sender, ConfigureDataConnectionWebEventArgs e) {
            if (e.DataSourceName == "Departments") {
                e.ConnectionParameters = new XmlFileConnectionParameters() { FileName = FileProvider.GetFileInfo("App_Data/Departments.xml").PhysicalPath };
            }
            if (e.ConnectionName == "energyStatisticsDataConnection") {
                e.ConnectionParameters = new ExcelDataSourceConnectionParameters(FileProvider.GetFileInfo("App_Data/EnergyStatistics.xls").PhysicalPath);
            }
        }

        private void Configurator_DataLoading(object sender, DataLoadingWebEventArgs e) {
            if (e.DataId == "odsTaskData") {
                DataSet dataSet = new DataSet();
                dataSet.ReadXml(FileProvider.GetFileInfo("App_Data/GanttData.xml").PhysicalPath);
                e.Data = dataSet.Tables[0];
            }
        }
    }
}