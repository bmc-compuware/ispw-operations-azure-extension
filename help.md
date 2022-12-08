## **Add Task**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The container ID for which you intend to add task |
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
| releaseId | The container ID for which you intend to add task |

Example:

|  Add Task |
| --- |
| runtimeConfiguration=TPZP <br> assignmentId=PLAY031347 <br> checkout=true <br> application=PLAY <br> checkoutFromLevel=PRD <br> path=DEV1 <br> stream=TOPAZ <br> taskName=TPROG15 <br> type=COB |


## **Build Assignment**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The ID of the assignment |
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
| releaseId | The ID of the release |
| assignmentId | The ID of the assignment  |
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
| taskId | The comma-separated list of task IDs for the tasks that need to be built. If the task ID is specified then application, level, mname, and mtype are not required and will be ignored, example taskId= 7E3AB4B229E1,7E3A5B90B9A2|
| assignmentId | The ID of the assignment to build the task in |
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
| application=PLAY <br> level=DEV1 <br> mtype=COB <br> mname=TPROG15 | taskId=7E6B13477338,7E6B3AA9E550 <br> **Note: If the task ID is specified then application, level, mname, and mtype are not required and will be ignored** |

## **Cancel Assignment / Close Assignment**  

Required:

| Parameter | Description |
| --- | --- |
| assignmentId | The assignment ID to be cancelled or closed |

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
| requestId | The deployment with the request ID to be cancelled |

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
| releaseId or releasePrefix | Either release ID or releasePrefix, but not both |

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
| assignmentId (Fallback Assignment) or releaseId (Fallback Release) | The container ID for which you intend to fallback tasks |
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
| assignmentId | The ID of the assignment to generate |
| level | Tasks in the assignment at this level will be generate |

Optional:

|  Parameter | Description |
| --- | --- |
| taskId | A task with this task ID will be generated. If the task ID is specified then assignmentId and level will be ignored, example taskId= 7E3AB4B229E1,7E3A5B90B9A2|
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
| assignmentId (Generate Tasks In Assignment) or releaseId (Generate Tasks In Release) | The container ID for which you intend to generate tasks |
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


## **Promote Assignment / Promote Release**  
Required:

|  Parameter | Description |
| --- | --- |
| assignmentId (Promote Assignment) or releaseId (Promote Release) | The container ID for which you intend to promote tasks. |
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
