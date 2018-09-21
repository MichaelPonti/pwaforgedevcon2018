using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ForgeApiCs.Utils
{
	static class RestHelpers
	{
		public static HttpClient CreateHttpClient()
		{
			var client = new HttpClient();
			client.DefaultRequestHeaders.Clear();
			return client;
		}

		public static HttpRequestMessage CreateRequest(string url, HttpMethod method = null, bool acceptJson = true)
		{
			HttpRequestMessage r = new HttpRequestMessage(method ?? HttpMethod.Get, url);
			r.Headers.Clear();
			r.Content = null;
			r.Properties.Clear();
			r.Headers.Accept.Clear();
			if (acceptJson)
				r.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

			return r;
		}


		public static T Deserialize<T>(string data)
		{
			return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(data);
		}

		public static string Serialize(object data)
		{
			return Newtonsoft.Json.JsonConvert.SerializeObject(data);
		}


		public static async Task<T> ReadResponseContentAsync<T>(HttpResponseMessage response) where T : class
		{
			if (response.IsSuccessStatusCode)
			{
				var s = await response.Content.ReadAsStringAsync();
				var ret = Deserialize<T>(s);
				return ret;
			}

			return null;
		}
	}
}
