
using BeerHub.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using unirest_net.http;

namespace BeerHub.Controllers
{
    public class BeerController : Controller
    {
        private readonly IConfiguration configuration;

        public BeerController( IConfiguration config)
        {
            configuration = config;
        }

        // Get beer by ID
        public string GetBeer(string id)
        {
            string uri = $"https://api.punkapi.com/v2/beers/{id}";

            HttpResponse<string> singleBeer = Unirest.get(uri).asJson<string>();

            object result = JsonConvert.DeserializeObject<object>(singleBeer.Body);
            return result.ToString();
        }

        // GET: /Beer/
        // Displays information of a single beer
        public IActionResult Index(string id)
        {
           return View(new Beer());
        }
    }
}

