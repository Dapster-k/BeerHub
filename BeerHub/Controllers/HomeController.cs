using BeerHub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using unirest_net.http;

namespace BeerHub.Controllers
{
    public class HomeController : Controller
    {

        public HomeController()
        {
        }
        public async Task<string> SearchBeers(string beer, int pageNum = 0)
        {
            string uri = $"https://api.punkapi.com/v2/beers?beer_name={beer}&page={++pageNum}&per_page=10";
            HttpResponse<string> beerResults = await Unirest.get(uri).asJsonAsync<string>();
            System.Diagnostics.Debug.WriteLine("Vinay : "+ uri + pageNum);
            var results = JsonConvert.DeserializeObject<object>(beerResults.Body);
            System.Diagnostics.Debug.WriteLine("Vinay Singh : " + results.ToString());
            return results.ToString();
        }
        

        public IActionResult Index()
        {
            
            return View();
        }

        public IActionResult Search()
        {
            // Display search results
            return View();
        }


       

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
