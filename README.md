# BMC AMI DevX Code Pipeline Operations

## Overview

The Code Pipeline Operations allows Azure DevOps users to execute Code Pipeline(ISPW) operations such as Generate, Promote, Deploy or Regress on the mainframe. Users can seamlessly integrate the Code Pipeline build process using Azure DevOps.

## Prerequisites

The following are required to use this extension:
- Azure Cloud or [On Premise Azure DevOps Server](https://learn.microsoft.com/en-us/azure/devops/server/download/azuredevopsserver?view=azure-devops)
- [Azure Pipelines agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser): Self Hosted Agents setup on which WorkBench CLI and BMC AMI Common Enterprise Services will be installed.
- [BMC AMI DevX Common Configuration Azure extension](https://marketplace.visualstudio.com/items?itemName=BMC.common-config-extension)
- [BMC AMI DevX Code Pipeline](https://www.bmc.com/it-solutions/bmc-compuware-ispw.html)
- [BMC AMI Common Enterprise Services](https://docs.bmc.com/docs/bces2010/introduction-to-bmc-compuware-enterprise-services-1068407133.html)

## Installing extensions in a Azure Devops Server Instance

Install the BMC AMI DevX Common Configuration extension and BMC AMI DevX Code Pipeline Operations extension according to the Azure Devops instructions for installing extensions. 

## Configuring Host Connections

Navigate to Pipelines and go to BMC Common Configurations section.

If no host connection appears in the **Host:Port** section, select Create New Host Option, add (host:port) in next textbox.

-   **Description** : Enter a description of the connection.

-   **Host:port** : Enter the z/OS host and port to connect to.

-   **Encryption protocol** : Select the desired encryption protocol to be used for this connection. 
    The encryption protocol is used to encrypt data sent to and from the host. The default is 'None'.

-   **Read/write timeout (minutes)** : Enter the number of minutes for the plugin to wait for a response from the host before timing out.

-   **CES URL** : Enter a URL for Common Enterprise Services (CES). By default it is empty. Please do NOT attach any context
    path, it should be in the format: [http://host:port/](http://hostport/).

**Note:** Click **Delete Host Connection** to delete an existing connection.

## Executing Code Pipeline Operations

While creating the new Azure pipeline, we can add a new task by clicking + sign on Agent Job and search for "BMC AMI DevX Code Pipeline Operations", select and click on **Add**.

This Code Pipeline Operations task has following parameters:

-   **Display name** :  The name of the Task.

-   **Host Connection** : Select the host connection to be used to connect to the z/OS host. Alternatively, to add a connection navigate to Pipelines and go to BMC Common Configurations section.

-   **Code Pipeline Operations** : Select Code Pipeline operations to perform action

-   **CES URL** : This field specifies the CES URL. Host connections with CES URL can be configured in the Common Configuration Extension.

-   **CES secret token**: The available CES secret token to perform Code Pipeline actions for Rest API call. In this feild, please pass pipeline variable name which is storing CES secret token as secret in Azure pipeline. Example $(cesToken).

-   **Action** : Code Pipeline operation to be performed. Following actions are supported :
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
    -   Get Deployment List
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

-   **buildAutomatically (if applicable)** : This allows to automatically build Task/Assignment from automaticBuildParams.txt generated by sync operation."

-   **Request**: Specify additional request parameters, [click here for more information](https://github.com/bmc-compuware/ispw-operations-azure-extension/blob/master/help.md).

-   **Skip waiting for the completion of the set (if applicable)** : This allows to turn on / off polling a set to wait for the job finish if it is applicable.

-   **Show Response body in console** : This allows you to turn on / off writing the response body to the log.

Click Save & queue > Save and run.

## Executing Git to Code Pipeline Sync

**Pre-requisite:** Disable shallow fetch in Azure Pipeline. [Click here for more information.](https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/azure-repos-git?view=azure-devops&tabs=yaml#sync-tags)

This Git to Code Pipeline Sync task has following parameters:

-   **Display name** :  The name of the Task.

-   **Host Connection** : Select the host connection to be used to connect to the z/OS host. Alternatively, to add a connection navigate to Pipelines and go to BMC Common Configurations section.

-   **Git to Code Pipeline Sync** : Select Git to Code Pipeine Sync to perform sync operation.

-   **Code Pipeline** : Expand Code Pipeline group to specify required parameters [ Workbench CLI Home, Runtime Configuration, User Id, Password, Stream, Application, Sub Application, YAML Mapping File, Encryption protocol, Code Page, Read/write timeout (minutes) ].

-   **Git to Code Pipeline Branch Mapping**: [Click here for more information.](https://github.com/bmc-compuware/ispw-operations-azure-extension/blob/master/help.md#git-to-ispw-sync)"

Click Save & queue > Save and run.

## Product Assistance

BMC provides assistance for customers with its documentation, the BMC Support Center web site, and telephone customer support.

### BMC Support Center

You can access online information for BMC products via our Support Center site at [https://support.bmc.com](https://support.bmc.com/). Support Center provides access to critical information about your BMC products. You can review frequently asked questions, read or download documentation, access product fixes, or e-mail your questions or comments. The first time you access Support Center, you must register and obtain a password. Registration is free.

### Contacting Customer Support

At BMC, we strive to make our products and documentation the best in the industry. Feedback from our customers helps us maintain our quality standards. If you need support services, please obtain the following information before calling BMC\'s 24-hour telephone support:

- The Azure pipeline job output that contains any error messages or pertinent information.

- The name, release number, and build number of your product. This information is displayed in the installed extensions page. Apply filter: BMC in order to display all of the installed BMC extension.

- Environment information, such as the operating system and release on which the Workbench CLI is installed.

#### Web

You can report issues via BMC Support Center: [https://support.bmc.com](https://support.bmc.com/).

### Corporate Web Site

To access BMC site on the Web, go to [https://www.bmc.com/](https://www.bmc.com/). The BMC site provides a variety of product and support information.
