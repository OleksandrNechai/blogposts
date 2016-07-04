#Invoking the web API of IBM Watson's Speech to Text service  from .NET

With this blog post, I will try to help you in case you need to use IBM Watson web services in your application and your application is being developed in .NET. The problem is that IBM does not provide .NET development toolkits for accessing their services for some reason. They have only Java and Node. Without a toolkit, the task of accessing IBM Watson's web API becomes slightly more difficult. 

In the following example I will acccess the [Speech To Text](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html) service using .NET's  [HttpClient](https://msdn.microsoft.com/ru-ru/library/system.net.http.httpclient(v=vs.118).aspx) class in order to transcribe audio file. 

Before trying to make the first call it is necessary to register for the service and obtain username and password. Next, you will want to create and tune the instance of HttpClient:

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

The `continuous` is an example of many possible parameters, which can be passed along with content, a complete list of which can be looked up in the documentation. This one actually tells to Watson that it does not have to split text into pieces at the audio pauses.

To observe JSON response:

```csharp
if (response.IsSuccessStatusCode)
{
   var res = response.Content.ReadAsStringAsync().Result;
   Console.WriteLine(res);
}
```

Note that I basically ignore the async nature of HttpClient here by extracting the result right away. One could easily do the API call asynchronously. But I actually prefer the simplicity of the synchronous solution, trading some execution speed for this.

Anyway, here is the complete code with the call of Watson and the output (don't forget to replace your username, password as well as your file name): 

```csharp
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;


class Program
{
    static void Main()
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Basic",
                Convert.ToBase64String(
                    Encoding.ASCII.GetBytes(
                       "yourusername:yourpassowrd")));

        var content = new StreamContent(new FileStream(@"D:\youraudiofile.wav", FileMode.Open));
            content.Headers.ContentType = new MediaTypeHeaderValue("audio/wav");

            var response = client.PostAsync("https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true", content).Result;
            if (response.IsSuccessStatusCode)
            {
                var res = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(res);
            }
        }
    }
}
```
