# pwaforgedevcon2018

If you attended the presentation, this repo has all the code that I presented. If you look in the **firstdemo** folder, this is the starting point of the first demo. I just pasted in code from the steps folder.

**demo2** folder has the contains the start of the second demo. Again the code that I pasted in is the steps folder. There were no steps 4 through 9, I skipped some numbers to give me some room: nothing is missing there.

## Phone Demo
Finally, at the end when I was showing it running on my phone, this is being hosted on https://michaelponti.github.io/pwaforgedevcon2018-2/index.html. All of the final code for that is hosted in the main folder in repo https://github.com/michaelponti/pwaforgedevcon2018-2. This makes use of the Azure Javascript functions for getting an auth token and getting the url list for the svf file. All of that code you can find in https://github.com/MichaelPonti/sw-forgefuncs-azure.

## HTML STATIC PAGES
All of the html static pages are hosted as pages under https://michaelponti.github.io/pwaforgedevcon2018 (thanks @wallabyway). For those few javascript functions that need some kind of remote server, such as retrieving a viewer token, I am going to use azure functions which will be detailed below.

## AZURE FUNCTION ENDPOINTS
These are serverless function endpoints that are hosted on Azure. If you are an AWS user, the equivalent is Lambda's. In either case you have the option of creating endpoints in .NET core or nodeJS and deploying without ever worrying about a server deployment.

I am using Azure with .NET core for this, but hopefully I will create an equivalent nodeJS function to go along with this.

To setup the project, I used Visual Studio 2017 and used the "Azure Functions" project template. It then gave me the following options to select from:

![project setup](images/azurefuncprojsetup.png)

Check out the code in the AzureFuncs folder.

### Where are the keys?
When you are setting up your publishing profile, you have the option to specify your application settings. In here you can specify ones that get deployed to Azure and local ones.
![application settings](images/azuredeploysettings.png)
