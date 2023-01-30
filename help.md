## **Add Task**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The container id for which you intend to add task |
| checkout | Whether to checkout the task. Valid values are true or false. Defaut value is false|
| taskName | The task or component name |
| stream | The stream name|
| application | The application name |
| type | The task or component type |
| path | The test level location where component will reside |
| checkoutFromLevel | The level where to obtain the base component version to checkout from | 

Optional:

|  Parameter | Description |
| --- | --- |
| runtimeConfiguration | The runtime configuration |
| subAppl | The sub application name |
| action | Action code can be any of the following: <br> **Blank** - The task was created with no other actions.<br> **Compile only** - The component was added for compile only, without going through the rest of the change cycle process. <br> **Delete Prod Source** - Deletes the production-level source and executables from the production environment.<br> **Added from History** - Indicates that a historical version (for example, -1 or -2) of a component is requested for checkout.<br> **Fallback** - Component falls back to a previous component version at production.<br> **Implement** - Deploy processing is taking place|
| owner | The Owner of the set that will be used for processing the action |
| releaseId | The container id for which you intend to add task |

Example:

|  Add Task |
| --- |
| runtimeConfiguration=TPZP <br> assignmentId=PLAY031347 <br> checkout=true <br> application=PLAY <br> checkoutFromLevel=PRD <br> path=DEV1 <br> stream=TOPAZ <br> taskName=TPROG15 <br> type=COB |


## **Build Assignment**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The id of the assignment |
| level | Tasks in the assignment at this level will be built |

Optional:

|  Parameter | Description |
| --- | --- |
| mtype | Component of this type in the assignment will be built, if specified |
| mname | Components with this name in the assignment will be built, if specified |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Build Assignment #1 | Build Assignment #2 |
| --- | -- |
| assignmentId=PLAY031347 <br> level=DEV1 | assignmentId=PLAY031347 <br> level=DEV1 <br> mname=TPROG23 <br> mtype=COB |


## **Build Release**  

Required:

| Parameter | Description |
| --- | --- |
| releaseId | The id of the release |
| assignmentId | The id of the assignment  |
| level | Tasks in the assignment at this level will be built |

Optional:

|  Parameter | Description |
| --- | --- |
| mtype | Component of this type in the assignment will be built, if specified |
| mname | Components with this name in the assignment will be built, if specified |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

|  Build Release #1 | Build Release #2 |
| --- | -- |
| releaseId=ADORELEASE <br> assignmentId=PLAY031347 <br> level=DEV1 | releaseId=ADORELEASE <br> assignmentId=PLAY031347 <br> level=DEV1 <br> mname=TPROG23 <br> mtype=COB |


## **Build Task**  

Required:

| Parameter | Description |
| --- | --- |
| application | The application name |
| level | Tasks in the assignment at this level will be built |
| mtype | Component of this type in the assignment will be built, if specified |
| mname | Components with this name in the assignment will be built, if specified |

Optional:

|  Parameter | Description |
| --- | --- |
| taskId | The comma-separated list of task IDs for the tasks that need to be built. If the task id is specified then application, level, mname, and mtype are not required and will be ignored, example taskId= 7E3AB4B229E1,7E3A5B90B9A2|
| assignmentId | The id of the assignment to build the task in |
| subAppl | The sub application name |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
<!-- | taskIds | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]| -->

Example:

|  Build Task #1  | Build Task #2  |
| --- | -- |
| application=PLAY <br> level=DEV1 <br> mtype=COB <br> mname=TPROG15 | taskId=7E6B13477338,7E6B3AA9E550 <br> **Note: If the task id is specified then application, level, mname, and mtype are not required and will be ignored** |

## **Cancel Assignment / Close Assignment**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The assignment id to be cancelled or closed |

Optional:

|  Parameter | Description |
| --- | --- |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Cancel Assignment | Close Assignment |
| --- | -- |
| assignmentId=PLAY031347 | assignmentId=PLAY031350 |

## **Cancel Release / Close Release**  

Required:

| Parameter | Description |
| --- | --- |
| releaseId | The release id to be cancelled or closed |

Optional:

|  Parameter | Description |
| --- | --- |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Cancel Release | Close Release |
| --- | -- |
| releaseId=REL01 | releaseId=REL02 |

## **Cancel Deployment**  

Required:

| Parameter | Description |
| --- | --- |
| requestId | The deployment with the request id to be cancelled |

Optional:

|  Parameter | Description |
| --- | --- |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Cancel Deployment | 
| --- |
| requestId=46158 |

## **Create Assignment**  

Required:

| Parameter | Description |
| --- | --- |
| stream | Stream name |
| application | Application name |
| defaultPath | Default checkout path |
| description | Description for the assignment |
| assignmentPrefix | Assignment prefix |

Optional:

|  Parameter | Description |
| --- | --- |
| owner | Owner of the container |
| subAppl | Sub application name |
| referenceNumber | Reference number |
| releaseId | The release id |
| userTag | User tag |
| sandboxJoinAtLevel | Sandbox Join at level |											  

Example:

|  Create Assignment |
| --- |
| stream=PLAY <br> application=PLAY <br> subAppl=PLAY <br> defaultPath=DEV2 <br> description=Create Assignment for ADO <br> assignmentPrefix=PLAY |

## **Create Release**  

Required:

| Parameter | Description |
| --- | --- |
| stream | Stream name |
| application | Application name |
| description | Description for the release |
| releaseId or releasePrefix | Either release id or releasePrefix, but not both |

Optional:

|  Parameter | Description |
| --- | --- |
| owner | Owner of the container |
| subAppl | Sub application name |
| referenceNumber | Reference number |

Example:

|  Create Release |
| --- |
| stream=PLAY <br> application=PLAY <br> subAppl=PLAY <br> releaseId=MyR01 <br> description=Create Release for ADO |

## **Deploy Assignment / Deploy Release**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId (Deploy Asignment) or releaseId (Deploy Release) | The container for which you intend to deploy tasks |
| level | Tasks in the container at this level will be deployed |

Optional:

|  Parameter | Description |
| --- | --- |
| mtype | Components of this type in the assignment will be deployed if specified |
| mname | Components with this name in the assignment will be deployed if specified |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Deploy Assignment  | Deploy Release |
| --- | -- |
| assignmentId=PLAY031347 <br> level=DEV1 <br> #optional <br> mname=TPROG07 <br> mtype=COB | releaseId=ADORELEASE <br> level=DEV1 <br> #optional <br> mname=TPROG23 <br> mtype=COB |


## **Deploy Task**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The container for which you intend to deploy tasks |
| level | Tasks in the container at this level will be deployed |

Optional:

|  Parameter | Description |
| --- | --- |
| taskId | The comma-separated list of task IDs for the tasks that need to be deployed. Example taskId= 7E3AB4B229E1,7E3A5B90B9A2|
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
<!-- | taskIds | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]| -->

Example:

|  Deploy Task #1  | Deploy Task #2  |
| --- | -- |
|  assignmentId=PLAY031347 <br> level=DEV1 |  assignmentId=PLAY031347 <br> level=DEV1 <br> taskId=7E6B13477338,7E6B3AA9E550 |

## **Fallback Assignment / Fallback Release**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId (Fallback Assignment) or releaseId (Fallback Release) | The container id for which you intend to fallback tasks |
| level | All tasks in the container at this level will fallback |

Optional:

|  Parameter | Description |
| --- | --- |
| mtype | Component of this type in the assignment will fallback, if specified |
| mname | Components with this name in the assignment will fallback, if specified |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Fallback Assignment | Fallback Release |
| --- | -- |
| assignmentId=PLAY031347 <br> level=DEV1 <br> #optional <br> mname=TPROG07 <br> mtype=COB | releaseId=ADORELEASE <br> level=DEV1 <br> #optional <br> mname=TPROG23 <br> mtype=COB |


## **Generate Task**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The id of the assignment to generate |
| level | Tasks in the assignment at this level will be generate |

Optional:

|  Parameter | Description |
| --- | --- |
| taskId | A task with this task id will be generated. If the task id is specified then assignmentId and level will be ignored, example taskId= 7E3AB4B229E1,7E3A5B90B9A2|
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
<!-- | taskIds | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]| -->

Example:

|  Generate Task #1  | Generate Task #2  |
| --- | -- |
| assignmentId=PLAY031347 <br> level=DEV1 |  assignmentId=PLAY031347 <br> level=DEV1 <br> taskId=7E6B13477338,7E6B3AA9E550|


## **Generate Tasks In Assignment / Generate Tasks In Release**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId (Generate Tasks In Assignment) or releaseId (Generate Tasks In Release) | The container id for which you intend to generate tasks |
| level | Tasks in the container at this level will be generated |

Optional:

|  Parameter | Description |
| --- | --- |
| mtype | Component of this type in the assignment will be generated, if specified |
| mname | Components with this name in the assignment will be generated, if specified |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Generate Assignment | Generate Release | 
| --- | --- |
| assignmentId=PLAY031347 <br> level=DEV1 <br> #optional <br>  mname=TPROG23 <br> mtype=COB | releaseId=ADORELEASE <br> assignmentId=PLAY031347 <br> level=DEV1 <br> #optional <br> mname=TPROG23 <br> mtype=COB |


## **Get Assignment Info**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | 	The assignment id |

Example:

| Get Assignment Info |
| --- |
| assignmentId=PLAY031347 |


## **Get Assignment Task List**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | 	The assignment id |
| level  | 	All tasks in the assignment at this level will be displayed |

Example:

| Get Assignment Task List |
| --- |
| assignmentId=PLAY031347 <br> level=DEV2 |


## **Get Container List**  

Required: None

Optional:

| Parameter | Description |
| --- | --- |
| application | The ISPW application id.  Trailing wildcards are supported, i.e. FOO* |
| subAppl | The sub application.  Trailing wildcards are supported, i.e. FOO* |
| containerId | The container id (Assignment id, Release id or Set id). Trailing wildcards are supported, i.e. PRFX0000* |
| containerType | The type of container: A=Assignment, R=Release, S=Set |
| description | The description for the container. Trailing wildcards are supported such as REF123* |
| includeClosedContainers | Whether to include closed containers in the list.  Valid values are true or false (default) |
| owner | The owner of the container. Trailing wildcards are supported, i.e. MYID* |
| path | The default container path.  Trailing wildcards are supported, i.e. DEV* |
| refNumber | Site defined number typically used to associate the container with a problem ticket number or change request number.Trailing wildcards are supported, i.e. MYISSUE* |
| releaseId | The 10-character release number, if associated with an assignment. Trailing wildcards are supported, i.e. RELEASE1* |
| stream | The ISPW stream name. Trailing wildcards are supported, i.e. BAR* |
| tag | User-definable four-character field. Trailing wildcards are supported, i.e. TAG* (Case sensitive) |
| userId | The owner or joined user for a container |

Example:

| Get Container List |
| --- |
| application=PLAY <br> containerId=PLAY001386 <br> containerType=A <br> description=myContainer <br> includeClosedContainers=false <br> owner=myUserId <br> path=DEV1 <br> refNumber=JIRA1234 <br> releaseId=R00001234 <br> stream=PLAY <br> subAppl=PLAY <br> userId=myUserId |


## **Get Release Info**  

Required:

| Parameter | Description |
| --- | --- |
| releaseId | 	The release id |

Example:

| Get Release Info |
| --- |
| releaseId=JKGENRELID |

## **Get Release Task Generate Listing**  

Required:

| Parameter | Description |
| --- | --- |
| releaseId | 	The release id |
| taskId  | 	The task id |

Example:

| Get Release Task Generate Listing |
| --- |
| releaseId=JKGENRELID <br> taskId=7E1AC3D3DE25 |


## **Get Release Task Info**  

Required:

| Parameter | Description |
| --- | --- |
| releaseId | 	The release id |
| taskId  | 	The task id |

Example:

| Get Release Task Info |
| --- |
| releaseId=JKGENRELID <br> taskId=7E1AC3D3DE25 |


## **Get Release Task List**  

Required:

| Parameter | Description |
| --- | --- |
| releaseId | 	The release id |
| level  | 	All tasks in the release at this level will be displayed |

Example:

| Get Release Task List |
| --- |
| releaseId=JKGENRELID <br> level=DEV2  |


## **Get Set Info**  

Required:

| Parameter | Description |
| --- | --- |
| setId | 	The set id you want info on |
| level  | 	All tasks in the set at this level will be displayed |

Example:

| Get Set Info |
| --- |
| setId=S000015218 <br> level=DEV1|


## **Get Set Task List**  

Required:

| Parameter | Description |
| --- | --- |
| setId | 	The set id you want info on|

Example:

| Get Set Task List |
| --- |
| setId=S000015218  |


## **Get Work List**  

Required: None

Optional:

| Parameter | Description |
| --- | --- |
| inProgress | True/false value indicating whether or not to include active tasks that are not in Production. The default value is true. |
| production | True/false value indicating whether or not to include current Production tasks. The default value is false.|
| historical | True/false value indicating whether or not to include tasks that were once in Production. The default value is false.|
| startDate | Specify the start date in yyyy-mm-dd format to filter a range based on last update. |
| endDate | Specify the end date in yyyy-mm-dd format to filter a range based on last update.|
| application | Container's primary application code. Containers may include components from multiple applications. Trailing wildcards are supported, i.e. FOO*|
| subAppl | Container's primary sub application code. Containers may include components from multiple applications. Trailing wildcards are supported, i.e. FOO*|
| environment | ISPW environment for this version (such as OUTS, TEST, HOLD, or PROD). Trailing wildcards are supported, i.e. PRO* |
| group | Component or task belonging to this application owner group. Trailing wildcards are supported, i.e. FOO* |
| lastUpdatedBy | User ID that requested the last significant operation (see Operation). |
| level |Level of this component when the last operation was requested. Trailing wildcards are supported, i.e. DEV*|
| name |A component name (case sensitive). Trailing wildcards are supported, i.e. TPROG*|
| operation |Last operation performed on this component. Valid operation values include Browse, Checkout, Delete, Edit, Fallback, Generate, Implement, Loaded, Promote, Regress, Transfer, and Update Replace Version|
| owner |User who performed the checkout of the component.|
| refNumber |Optional, site-definable field typically used to associate the assignment with a problem ticket number or change request number. Trailing wildcards are supported, i.e. MYISSUE*|
| releaseId |Release a component belongs to. Trailing wildcards are supported, i.e. RELEASE1*|
| stream |2- to 8-character code defines the application structure with which the application is associated. Trailing wildcards are supported, i.e. BAR*|
| type |The one-to four-character acronym for the type of component, such as COB for a Cobol program or COPY for a copybook. Trailing wildcards are supported, i.e. C*|

Example:

| Get Work List |
| --- |
| inProgress=true<br>production=true<br>historical=true<br>startDate=2019-01-01<br>endDate=2019-03-31<br>application=PLAY<br>subAppl=PLAY<br>environment=TEST<br>group=GRP1<br>lastUpdatedBy=FOOUSER<br>level=DEV1<br>name=TPROG01<br>operation=Promote<br>owner=FOOUSER<br>refNumber=JIRA1234<br>releaseId=RLS001<br>stream=PLAY<br>type=COB |


## **Promote Assignment / Promote Release**  
Required:

|  Parameter | Description |
| --- | --- |
| assignmentId (Promote Assignment) or releaseId (Promote Release) | The container id for which you intend to promote tasks. |
| level | All tasks in the release at this level will be generated |

Optional:

|  Parameter | Description |
| --- | --- |
| mname | component with this name in the container will be promoted |
| mtype | component with this type in the container will be promoted |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Promote Assignment | Promote Release |
| --- | --- |
| assignmentId=PLAY000313  <br>level=DEV2  <br>#optional  <br>mname=TPROG09  <br>mtype=COB | releaseId=JKGENRELID  <br>level=DEV2  <br>#optional  <br>mname=TPROG09  <br>mtype=COB|


## **Regress Assignment / Regress Release**  
Required:

|  Parameter | Description |
| --- | --- |
| assignmentId (Regress Asignment) or releaseId (Regress Release) | The container for which you intend to regress the tasks |
| level | All tasks in the container at this level will be generated |

Optional:

|  Parameter | Description |
| --- | --- |
| mname | component with this name in the container will be regressed |
| mtype | component with this type in the container will be regressed |
| runtimeConfiguration | See ISPW administrator for valid value. If the value is empty, leave it blank |
| changeType | S for standard (default), I for incidental, or E for emergency. Default Value is "S" |
| executionStatus |  I for immediate execution (or use a specified date/time), H to hold the execution.  Default Value is "I" |
| dpenvlst | The DPENVLST parameter allows you to override the environments configured for deploy at that level. If you wish to deploy to only certain environments, you can list them here, separated by a space. The length of the field is limited to 255. Default Value is "" (blank) |
| system | Allows you to specify a specific System for the Deploy. Default Value is "" (blank) |
| autoDeploy | Indicate true to auto deploy if the deployment has been configured in your ISPW instance. Indicate false or do not provide this parameter for no deployment (default). Default value is "false" |
| deployActiveDate | Deploy active date, example = "2017-08-18". Default Value is "" (blank) |
| deployActiveTime | Deploy active time, example = "17:51:24". Default Value is "" (blank) |
| deployImplementationDate | Deploy implementation date, example = "2017-08-18". Default Value is "" (blank) |
| deployImplementationTime | Deploy implementation time, example = "16:51:24". Default Value is "" (blank) |
| override | Specify true to override a higher version of the task during promote. Use with caution. Default Value is "" (blank) |
| taskId | List of Task Id, example taskId: ["7E3AB4B229E1","7E3A5B90B9A2"]|

Example:

| Regress Assignment | Regress Release |
| --- | --- |
| assignmentId=PLAY000313  <br>level=STG2  <br>#optional  <br>mname=TPROG09  <br>mtype=COB | releaseId=JKGENRELID  <br>level=STG2  <br>#optional  <br>mname=TPROG09  <br>mtype=COB |


## **Remove From Release**  

Required: none

Optional:

|  Parameter | Description |
| --- | --- |
|level|All tasks at this level will be removed|
|mname|The component name to be removed|
|mtype|The component type to be removed|
|taskId|The task ID to be removed|

Example:

| Remove From Release |
| --- |
| releaseId=RLS123<br>level=DEV1<br>mname=TPROG01<br>mtype=COB<br>taskId=7E2BACADE42C |


## **Set Operation**  

Required: 

|  Parameter | Description |
| --- | --- |
|setId|The set ID|
|action|The action to be operated on the set,supported actions: hold, release, lock, unlock, delete, restart, terminate;or approve, deny, reset (approver must be provided)|

Optional:

|  Parameter | Description |
| --- | --- |
|runtimeConfiguration|The runtime configuration|
|approver|The approver name, must be provided if use action -  approve, deny, reset|

Example:

| Set Operation|
| --- |
| runtimeConfiguration=TPZP <br>action=deny<br>approver=dummy<br>setId=S000143423 |


## **Task Load**  

Required: 

|  Parameter | Description |
| --- | --- |
|assignmentId| The assignment ID to add task to|
|stream|The stream|
|application|The application name|
|moduleName|The name of the task to be loaded|
|moduleType|The type of the task|
|currentLevel|The current level of the task|
|startingLevel|The starting level for the task|
|userId|The user ID|

Optional:

|  Parameter | Description |
| --- | --- |
|runtimeConfiguration|The runtime configuration|
| subAppl | The sub application name |
|release| The release |

Example:

| Task Load|
| --- |
| runtimeConfiguration=TPZP<br>assignmentId=PLAY001386<br>stream=PLAY<br>application=PLAY<br>subAppl=PLAY<br>moduleName=TREXX23<br>moduleType=CLST<br>currentLevel=DEV1<br>startingLevel=DEV1<br>userId=Foobar |


## **Transfer Task**  

Required: 

|  Parameter | Description |
| --- | --- |
|assignmentId|The assignment ID to move task from|
|containerId|The target container ID to move to|
|containerType|'A' or 'R'. A for assignment and R for release|

Optional:

|  Parameter | Description |
| --- | --- |
|runtimeConfiguration| The runtime configuration|
|level|All tasks at this level will be transferred|
|mname|The component name to be transferred|
|mtype|The component type to be transferred|
|taskId|The task ID to be transferred|

Example:

| Transfer Task |
| --- |
| runtimeConfiguration=TPZP<br>assignmentId=PLAY001386<br>level=DEV1<br>containerId=PLAY001387<br>containerType=A|