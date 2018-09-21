using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using ForgeApiCs.Utils;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;
using ForgeApiCs.Models;

namespace ForgeApiCs
{
	public static class ForgeViewerAuth
	{
		[FunctionName("ForgeViewerAuth")]
		public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequest req, TraceWriter log)
		{
			log.Info("Forge Viewer Token Retrieval: C# HTTP trigger function processed a request.");


			string forgeClientId = Environment.GetEnvironmentVariable("forge_client_id", EnvironmentVariableTarget.Process);
			string forgeSecret = Environment.GetEnvironmentVariable("forge_secret", EnvironmentVariableTarget.Process);

			var client = RestHelpers.CreateHttpClient();

			string scopes = "viewables:read";
			string content = $"client_id={forgeClientId}&client_secret={forgeSecret}&grant_type=client_credentials&scope={scopes}";

			using (HttpRequestMessage r = RestHelpers.CreateRequest("https://developer.api.autodesk.com/authentication/v1/authenticate", HttpMethod.Post))
			{
				r.Content = new StringContent(content);
				r.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/x-www-form-urlencoded");
				using (var response = await client.SendAsync(r))
				{
					var ret = await RestHelpers.ReadResponseContentAsync<BearerToken>(response);
					if (ret == null)
					{
						return new BadRequestResult();
					}
					else
					{
						var authData = new JsonResult(ret);
						return authData;
					}
				}

			}
		}
	}
}

