# BMC ISPW Operations
![](images/ISPW_marble.png)

## Overview

The BMC ISPW Operations extension allows users to perform ISPW to git Sync functionality and CES operations.

## Prerequisites

The following are required to use this plugin:
- Local Azure DevOps Server
- [BMC common configuration Azure extension](https://marketplace.visualstudio.com/items?itemName=BMC.common-config-extension)
- Compuware mainframe ISPW
- Compuware CES

Note: This extension version is only supported with local Azure Devops Server, it will not work with Azure Cloud. In future versions of this extension, we will support Azure cloud.

## Installing extensions in a Azure Devops Server Instance

1. Install the BMC common configuration extension and BMC ISPW Operation extension according to the Azure Devops instructions for installing extensions. 

### Configuring Host Connections and CES Tokens

-   If no host connection appears in the **Host Connections** section,
    click **Add Host Connection **and add a host connection by entering
    the following information:

    -   In the **Description** field, enter a description of the
        connection.

    -   In the **Host:port**field, enter the z/OS host to connect to.

    -   From the **Code page** list, select the desired code page to be
        used for this connection. The code page is used to translate
        data sent to and from the host. The default is 1047.

    -   In the **Read/write timeout (minutes)** field, enter the number
        of minutes for the plugin to wait for a response from the host
        before timing out.

    -   In the **CES URL** field, enter the CES server URL. The default
        is empty. It is not required for other Compuware plugins but is
        required to use this plugin. Please do NOT attach any context
        path, it should be in the format:
        [http://host:port](http://hostport/).

    **Note:** Click **Delete Host Connection** to delete an existing
    connection.

---
### Executing ISPW Operations

-   On the **Configuration** page of the job or project,
    select **Execute a Compuware ISPW Operation** from
    the **Build** section.

-   From the **Host connection** list, select the host connection to be
    used to connect to CES host. Alternatively, to add a connection,
    click **Manage connections**. The **Host connections** section of
    the Jenkins configuration page appears so a connection can be added.

-   In the **CES secret token** list, select the CES token configured in
    the CES host for the ISPW. Alternatively, click **Add** to add
    secret text as token using the Plain Credentials plugin. Refer to
    the Jenkins documentation for the Plain Credentials plugin.
-   In the **Action** section to define what ISPW operation to perform
    -   AddTask
    -   BuildAssignment
    -   BuildRelease
    -   BuildTask
    -   CancelAssignment
    -   CancelDeployment
    -   CancelRelease
    -   CloseAssignment
    -   CloseRelease
    -   CreateAssignment
    -   CreateRelease
    -   DeployAssignment
    -   DeployRelease
    -	DeployTask
    -   FallbackAssignment
    -   FallbackRelease
    -	GenerateTask
    -   GenerateTasksInAssignment
    -   GenerateTasksInRelease
    -   GetAssignmentInfo
    -   GetAssignmentTaskList
    -   GetContainerList
    -   GetReleaseInfo
    -   GetReleaseTaskGenerateListing
    -   GetReleaseTaskInfo
    -   GetReleaseTaskList
    -   GetSetInfo
    -   GetSetTaskList
    -   GetWorkList
    -   PromoteAssignment
    -   PromoteRelease
    -   RegressAssignment
    -   RegressRelease
    -   RemoveFromRelease
    -   SetOperation
    -   TaskLoad
    -   TransferTask
-   In the **Request** section, please specify additional request
    parameters, click the question mark for more details. Each of the
    action may have different set of properties, if the job support web
    hook callback, additional event related properties must be provided.
    The webhook callback only works for pipeline build.


## Product Assistance

BMC provides assistance for customers with its documentation, the BMC Support Center web site, and telephone customer support.

### BMC Support Center

You can access online information for BMC products via our Support Center site at [https://support.bmc.com](https://support.bmc.com/). Support Center provides access to critical information about your BMC products. You can review frequently asked questions, read or download documentation, access product fixes, or e-mail your questions or comments. The first time you access Support Center, you must register and obtain a password. Registration is free.

### Contacting Customer Support

At BMC, we strive to make our products and documentation the best in the industry. Feedback from our customers helps us maintain our quality standards. If you need support services, please obtain the following information before calling BMC\'s 24-hour telephone support:

- The Azure pipeline job output that contains any error messages or pertinent information.

- The name, release number, and build number of your product. This information is displayed in the installed extensions page. Apply filter: BMC in order to display all of the installed BMC extension.

- Environment information, such as the operating system and release on which the Topaz CLI is installed.

You can contact BMC in one of the following ways:


#### Web

You can report issues via BMC Support Center: [https://support.bmc.com](https://support.bmc.com/).

Note: Please report all high-priority issues by phone.

### Corporate Web Site

To access BMC site on the Web, go to [https://www.bmc.com/](https://www.bmc.com/). The BMC site provides a variety of product and support information.
