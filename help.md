## **Add Task**  

Required:

| Parameter | Description |
| --- | --- |
| runtimeConfiguration | The runtime configuration |
| assignmentId | The container ID for which you intend to add task |
| checkout | Whether to checkout the task. Valid values are true or false. Defaut value is false|
| application | The application name |
| checkoutFromLevel | The level where to obtain the base component version to checkout from |
| path | The test level location where component will reside |
| stream |The stream name|
| taskName | The task or component name |
| type | The task or component type 


Optional:

|  Parameter | Description |
| --- | --- |
| action | Action code can be any of the following: <br> **Blank** - The task was created with no other actions.<br> **Compile only** - The component was added for compile only, without going through the rest of the change cycle process. <br> **Delete Prod Source** - Deletes the production-level source and executables from the production environment.<br> **Added from History** - Indicates that a historical version (for example, -1 or -2) of a component is requested for checkout.<br> **Fallback** - Component falls back to a previous component version at production.<br> **Implement** - Deploy processing is taking place|
| owner | The Owner of the set that will be used for processing the action |
| releaseId | The container ID for which you intend to add task |


Example:

|  Parameter
| --- 
| runtimeConfiguration=TPZP <br> assignmentId=TIMK031347 <br> checkout=true <br> application=TIMK <br> checkoutFromLevel=PRD <br> path=DEV1 <br> stream=TOPAZ <br> taskName=TPROG15 <br> type=COB |


## **PromoteAssignment / PromoteRelease actions**  
Required:

|  Parameter | Description |
| --- | --- |
| runtimeConfiguration | see ISPW administrator for valid values |
| assignmentId (PromoteAssignment) or releaseId (PromoteRelease) | The container ID for which you intend to promote tasks. |
| level | All tasks in the release at this level will be generated |

Optional:

|  Parameter | Description |
| --- | --- |
| mname | component with this name in the container will be promoted |
| mtype | component with this type in the container will be promoted |
| override | override the higher version if  presented in the next level. Default to no override. |
| changeType | optional, S for standard, I for incidental, or E for emergency. Default value of S. |
| executionStatus | I for immediate execution or at start date/time, H to create request in hold |
| autoDeploy | promotes can be set up to automatically Deploy as well by an option set up by the ISPW. The default is to not use Auto Deploy |

Example:

| PromoteAssignment | PromoteRelease |
| --- | --- |
| runtimeConfiguration=TPZP  <br>assignmentId=PLAY000313  <br>level=DEV2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB |   runtimeConfiguration=TPZP  <br>releaseId=JKGENRELID  <br>level=DEV2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB|


## **RegressAssignment / RegressRelease actions**  
Required:

|  Parameter | Description |
| --- | --- |
| runtimeConfiguration | see ISPW administrator for valid values |
| assignmentId (RegressAsignment) or releaseId (RegressRelease) | The container for which you intend to regress the tasks |
| level | All tasks in the container at this level will be generated |

Optional:

|  Parameter | Description |
| --- | --- |
| mname | component with this name in the container will be regressed |
| mtype | component with this type in the container will be regressed |
| changeType | S for standard, I for incidental, or E for emergency. Default value of S |
| executionStatus | I for immediate execution or at start date/time, H to create request in hold |

Example:

| RegressAssignment | RegressRelease |
| --- | --- |
| runtimeConfiguration=TPZP  <br>assignmentId=PLAY000313  <br>level=STG2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB | runtimeConfiguration=TPZP <br>releaseId=JKGENRELID  <br>level=STG2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB |