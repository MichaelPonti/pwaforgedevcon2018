using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ForgeApiCs.Models
{
	class BearerToken
	{
		[JsonProperty("token_type", DefaultValueHandling = DefaultValueHandling.Ignore)]
		public string TokenType { get; set; }

		[JsonProperty("expires_in", DefaultValueHandling = DefaultValueHandling.Ignore)]
		public int? ExpiresIn { get; set; }

		[JsonProperty("access_token", DefaultValueHandling = DefaultValueHandling.Ignore)]
		public string AccessToken { get; set; }

		[JsonProperty("refresh_token", DefaultValueHandling = DefaultValueHandling.Ignore)]
		public string RefreshToken { get; set; }


		[JsonProperty("date_expires")]
		public DateTime? DateExpires { get; set; }
	}
}
