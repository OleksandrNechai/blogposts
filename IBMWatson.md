With this blog post I will try to help you in case you need to use IBM Watson web services in your application and your application is being developed in .NET. The problem is that IBM does not provide .NET developemtnt toolkits for accessing their services for some reason. They have only Java and Node. Without a toolkit the task of accesssing IBM watsin web API becomes slightly more difficult. 

In the following example I will acccess the [Speech To Text](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html) service using .NET's  [HttpClient](https://msdn.microsoft.com/ru-ru/library/system.net.http.httpclient(v=vs.118).aspx) class in order to transcribe audio file. 

Before trying to make first call it is necessary to register for the service and obtain username and password. Next you will want to create and tune the instance of HttpClient:

```csharp
using(var client = new HttpClient()) {
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
    "Basic",
        Convert.ToBase64String(
            Encoding.ASCII.GetBytes(
                "yourusername:yourpassowrd")));
}
```

Now it's time to prepare the content to be sent to the IBM Watson. This content must be audio file stream, which must support one of the allowed formats, for details, see [docs](https://www.ibm.com/watson/developercloud/speech-to-text/api/v1/#get_models). Here I will use wav format, because I have discovered that compressed audio formats lead to more errors in the resulted transcripts:

```csharp
var content = new StreamContent(new FileStream(@"D:\youraudiofile.wav", FileMode.Open));
content.Headers.ContentType = new MediaTypeHeaderValue("audio/wav");
```

Finally, the created client needs to be called with this content as an input 

```csharp
var response = client.PostAsync(
	"https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true", content).Result;
```

The `continuous` is an example of many possible parameters, which can be passed along with content, complete list of which can be looked up in the documenation. This one actually tells to Watson that it does not have to split text in pieces on the at the audio pauses.

To observe JSON response:

```csharp
if (response.IsSuccessStatusCode)
{
   var res = response.Content.ReadAsStringAsync().Result;
   Console.WriteLine(res);
}
```

Note that I basically ignore the async ature of HttpClient here by extracting the result rightaway. One could easily do thei API call asynchronously. But I actually prefer simplicity of synchronous solution, trading some execution speed for this.

Anyway, here is the complete code with call of Watson and output (dont forget to replace your username, password as well as your file name): 

```csharp

}
```
