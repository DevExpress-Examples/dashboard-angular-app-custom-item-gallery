using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreDashboardBackend {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}