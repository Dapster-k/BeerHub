using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using unirest_net.http;

namespace BeerHub.Models
{
    public class Favourites
    {
        private string _filePath;


        public Favourites()
        {
            _filePath = Directory.GetCurrentDirectory() + "\\file.txt";
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Read()
        {
            return (File.ReadAllText(_filePath));
        }
        public void Write(string data)
        {
            File.WriteAllText(_filePath, data);
        }
        public void AddToFile()
        {
            String data="";
            try
            {
                data = Read();
            }
            catch(FileNotFoundException ex)
            {
                Console.WriteLine("File not found");
            }
            finally
            {
                data += Id + "\n";
                Write(data);
            }
        }
        
    }
}
