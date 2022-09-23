# BMC ISPW Operations
![](images/ISPW_marble.png)

## Overview

The BMC ISPW Operations extension allows users to perform ISPW to git Sync functionality and CES operations.

## Prerequisites

The following are required to use this plugin:
- Local Azure DevOps Server.
- BMC common configuration Azure extension.
- Topaz Workbench CLI.
- Host Communications Interface.

Note: This extension version is only supported with local Azure Devops Server, it will not work with Azure Cloud. In future versions of this extension, we will support Azure cloud.

## Installing extensions in a Azure Devops Server Instance

1. Install the BMC common configuration extension and BMC ISPW Source Code Downloader extension according to the Azure Devops instructions for installing extensions. 
2. Install the Topaz Workbench CLI on the machine in which Azure Devops Server is running that will execute the extension. The Topaz Workbench CLI is available in the Topaz Workbench installation package. If you do not have the installation package, please visit [support.bmc.com](https://support.bmc.com/). 

## Configuring for Topaz Workbench CLI & Host Connections

In order to download ISPW members you will need to point to an installed Topaz Workbench Command Line Interface (CLI). The Topaz Workbench CLI will work with host connection(s) you also need to configure to download ISPW members.

![](images/ispw.common.config.png)


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
