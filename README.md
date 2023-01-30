# BMC ISPW Operations
![](images/ISPW_marble.png)

## Overview

The BMC ISPW Operations allows Azure DevOps users to execute ISPW operations, such as Generate, Promote, Deploy or Regress on the mainframe. Users can seamlessly integrate the ISPW build process using Azure DevOps.

## Prerequisites

The following are required to use this extension:
- [On Premise Azure DevOps Server](https://learn.microsoft.com/en-us/azure/devops/server/download/azuredevopsserver?view=azure-devops)
- [BMC common configuration Azure extension](https://marketplace.visualstudio.com/items?itemName=BMC.common-config-extension)
- [BMC Compuware ISPW](https://www.bmc.com/it-solutions/bmc-compuware-ispw.html)
- [BMC Compuware CES](https://docs.bmc.com/docs/bces2010/introduction-to-bmc-compuware-enterprise-services-1068407133.html)

Note: This extension version is only supported with on premise Azure DevOps Server, it will not work with Azure Cloud.

## Installing extensions in a Azure Devops Server Instance

Install the BMC common configuration extension and BMC ISPW Operation extension according to the Azure Devops instructions for installing extensions. 

## Configuring Host Connections

Navigate to Pipelines and go to BMC Common Configurations section.

If no host connection appears in the **Host:Port** section, select Create New Host Option, add (host:port) in next textbox.

-   **Description** : Enter a description of the connection.

-   **Host:port** : Enter the z/OS host and port to connect to.

-   **Encryption protocol** : Select the desired encryption protocol to be used for this connection. 
    The encryption protocol is used to encrypt data sent to and from   the host. The default is 'None'.

-   **Read/write timeout (minutes)** : Enter the number of minutes for the plugin to wait for a response from the host before timing out.

-   **CES URL** : Enter a URL for BMC Compuware Enterprise Services (CES). By default it is empty. Please do NOT attach any context
    path, it should be in the format: [http://host:port/](http://hostport/).

**Note:** Click **Delete Host Connection** to delete an existing connection.

## Executing BMC ISPW Operations

While creating the new Azure pipeline, we can add a new task by clicking + sign on Agent Job and search for "BMC ISPW Operations", select and click on **Add**.

This BMC ISPW Operations task has following parameters:

-   **Display name** :  The name of the Task.

-   **Host Connection** : Select the host connection to be used to connect to the z/OS host. Alternatively, to add a connection navigate to Pipelines and go to BMC Common Configurations section.

-   **CES URL** : This field specifies the CES URL. Host connections with CES url can be configured in the BMC Common Configuration Extension.

-   **CES secret token**: The available CES secret token to perform ISPW actions for Rest API call. In this feild, please pass pipeline variable name which is storing CES secret token as secret in Azure pipeline. Example $(variablename). 

-   **Action** :  ISPW operation to be performed. Following actions are supported :
    -   Add Task
    -   Build Assignment
    -   Build Release
    -   Build Task
    -   Cancel Assignment
    -   Cancel Deployment
    -   Cancel Release
    -   Close Assignment
    -   Close Release
    -   Create Assignment
    -   Create Release
    -   Deploy Assignment
    -   Deploy Release
    -	Deploy Task
    -   Fallback Assignment
    -   Fallback Release
    -	Generate Task
    -   Generate Tasks In Assignment
    -   Generate Tasks In Release
    -   Get Assignment Info
    -   Get Assignment Task List
    -   Get Container List
    -   Get Release Info
    -   Get Release Task Generate Listing
    -   Get Release Task Info
    -   Get Release Task List
    -   Get Set Info
    -   Get Set Task List
    -   Get Work List
    -   Promote Assignment
    -   Promote Release
    -   Regress Assignment
    -   Regress Release
    -   Remove From Release
    -   Set Operation
    -   Task Load
    -   Transfer Task

-   **Request**: Specify additional request parameters, [click here for more information](https://github.com/bmc-compuware/ispw-operations-azure-extension/blob/master/help.md).

-   **Skip waiting for the completion of the set (if applicable)** : This allows to turn on / off polling a set to wait for the job finish if it is applicable.

-   **Show Response body in console** : This allows you to turn on / off writing the response body to the log.

Click Save & queue > Save and run.

## Product Assistance

BMC provides assistance for customers with its documentation, the BMC Support Center web site, and telephone customer support.

### BMC Support Center

You can access online information for BMC products via our Support Center site at [https://support.bmc.com](https://support.bmc.com/). Support Center provides access to critical information about your BMC products. You can review frequently asked questions, read or download documentation, access product fixes, or e-mail your questions or comments. The first time you access Support Center, you must register and obtain a password. Registration is free.

### Contacting Customer Support

At BMC, we strive to make our products and documentation the best in the industry. Feedback from our customers helps us maintain our quality standards. If you need support services, please obtain the following information before calling BMC\'s 24-hour telephone support:

- The Azure pipeline job output that contains any error messages or pertinent information.

- The name, release number, and build number of your product. This information is displayed in the installed extensions page. Apply filter: BMC in order to display all of the installed BMC extension.

- Environment information, such as the operating system and release on which the Topaz CLI is installed.

#### Web

You can report issues via BMC Support Center: [https://support.bmc.com](https://support.bmc.com/).

### Corporate Web Site

To access BMC site on the Web, go to [https://www.bmc.com/](https://www.bmc.com/). The BMC site provides a variety of product and support information.