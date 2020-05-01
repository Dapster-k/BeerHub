using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BeerHub.Models;
using Newtonsoft.Json;
using unirest_net.http;

namespace BeerHub.Controllers
{
    public class FavouritesController : Controller
    {
        public IActionResult Add(string id,string name)
        {
            var fav = new Favourites() {Name="Buzz",Id = id};
            fav.AddToFile();
            string referer = Request.Headers["Referer"].ToString();
            return Redirect(referer);
        }
        public IActionResult Details()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<string> GetBeersWithId()
        {
            
            var fav = new Favourites();
            String data = fav.Read();
            var result = data.Split(new string[] { "\\n" }, StringSplitOptions.None);
            string results="";
            foreach (string a in result)
            {
                string uri = $"https://api.punkapi.com/v2/beers/{a}";
                HttpResponse<string> beerResults = await Unirest.get(uri).asJsonAsync<string>();
                results = results + JsonConvert.DeserializeObject<object>(beerResults.Body).ToString();
            }

            System.Diagnostics.Debug.WriteLine("dapster : " + JsonConvert.DeserializeObject<object>(results).ToString());
            return JsonConvert.DeserializeObject<object>(results).ToString();
        }
    }
}