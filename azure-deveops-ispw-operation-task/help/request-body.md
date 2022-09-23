  
**Optional common properties for those actions with webhook callback**  

httpHeaders

global custom headers used for all, colon and semicolon separated. For example, n1:v1;n2:v2;n3:v3.

credentials

global credentials used for all call backs. User name and password are colon separated.

events.name

event name

events.body

body for callback, required if having events

events.httpHeaders

custom headers - override global headers

events.credentials

used if 3rd party requires basic authentication - overrides global credentials

  
**AddTask action:**  
Required:

assignmentId  

The assignment ID to add task to  

taskName  

The name of the task to be added  

type  

The type of the task  

stream  

The stream  

application  

The application name  

path  

the path to checkout to  

checkoutFromLevel  

the level to checkout from  

owner  

The user  

releaseId  

The default release  

Optional:  

runtimeConfiguration  

The runtime configuration  

checkout  

default to only add, if true, also checkout the task  

generateAutomatically  

The request parameters for the generate will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step  

subAppl  

The Sub Application Name  

Example:

AddTask

runtimeConfiguration=TPZP  
assignmentId=PLAY001386  
taskName=TREXX23  
stream=PLAY  
application=PLAY  
subAppl=PLAY  
type=CLST  
path=DEV1  
owner=Foobar  
checkoutFromLevel=PRD  
releaseId=R1  

  
**BuildAssignment Action:**  
Required (unless buildAutomatically property is specified):

assignmentId

The ID of the assignment to build

level

Tasks in the assignment at this level will be built

Optional:  

runtimeConfiguration

The runtime configuration

mtype

Components with this name in the assignment will be built, if specified

mname

Component of this type in the assignment will be built, if specified

buildAutomatically

Set to true if the request parameters for the build will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step and is mutually exclusive with any other properties. If other properties are specified, the properties will be overridden.

Example:

BuildAssignment #1

runtimeConfiguration=TPZP  
assignmentId=PLAY001386  
mname=TREXX23  
mtype=COPY  
level=DEV1

BuildAssignment #2

buildAutomatically = true  

  
**BuildRelease Action:**  
Required (unless buildAutomatically property is specified):

releaseId

The ID of the release to build

assignmentId

The ID of the assignment to add the impacts to during the build

level

Tasks in the release at this level will be built

Optional:  

runtimeConfiguration

The runtime configuration

mtype

Components with this name in the release will be built, if specified

mname

Component of this type in the release will be built, if specified

buildAutomatically

Set to true if the request parameters for the build will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step and is mutually exclusive with any other properties. If other properties are specified, the properties will be overridden.

Example:

BuildRelease #1

runtimeConfiguration=TPZP  
releaseId=TESTREL  
assignmentId=PLAY001386  
mname=TREXX23  
mtype=COPY  
level=DEV1

BuildRelease #2

buildAutomatically = true  

  
**BuildTask Action:**  
Required (unless buildAutomatically property is specified):

application

A task with this application will be built

level

A task at this level will be built

mname

A task with this name will be built

mtype

A task with this type will be built

Optional:  

runtimeConfiguration

The runtime configuration

taskId

A task with this task ID will be built. If the task ID is specified then application, level, mname, and mtype are not required and will be ignored

assignmentId

The ID of the assignment to build the task in. This will be looked up if it is not specified

buildAutomatically

Set to true if the request parameters for the build will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step and is mutually exclusive with any other properties. If other properties are specified, the properties will be overridden.

subAppl

A task with this sub application will be built

Example:  

BuildTask #1

runtimeConfiguration=TPZP  
application=PLAY  
level=DEV1  
mname=TREXX04  
mtype=COPY  
assignmentId=PLAY000099

BuildTask #2

runtimeConfiguration=TPZP  
taskId=7E38639716C2

BuildTask #3

runtimeConfiguration=TPZP  
taskId=7E38639716C2,7E3A5B90B9A0

BuildTask #4

runtimeConfiguration=TPZP  
buildAutomatically = true  

  
**TaskLoad action:**  
Required:

assignmentId  

The assignment ID to add task to  

stream  

The stream  

application  

The application name  

moduleName  

The name of the task to be loaded  

moduleType  

The type of the task  

currentLevel  

the current level of the task  

startingLevel  

the starting level for the task  

userId  

The user ID  

Optional:  

runtimeConfiguration  

The runtime configuration  

release  

The release  

Example:

TaskLoad

runtimeConfiguration=TPZP  
assignmentId=PLAY001386  
stream=PLAY  
application=PLAY  
subAppl=PLAY  
moduleName=TREXX23  
moduleType=CLST  
currentLevel=DEV1  
startingLevel=DEV1  
userId=Foobar  

  
  
**CancelDeployment action:**  
Required:  

requestId

The deployment with the request ID to be cancelled  

Optional:  

runtimeConfiguration  

The runtime configuration  

Example:

runtimeConfiguration=TPZP  
requestId=46158  

  
**CancelAssignment / CloseAssignment**  
Required:  

assignmentId

The assignment ID to be cancelled or closed  

Optional:  

runtimeConfiguration  

The runtime configuration  

Example:  

CancelAssignment action  

runtimeConfiguration=TPZP  
assignmentId=PLAY001437  

CloseAssignment action  

runtimeConfiguration=TPZP  
assignmentId=PLAY001438

  
**CancelRelease / CloseRelease**  
Required:  

releaseId

The releaseID to be cancelled or closed  

Optional:  

runtimeConfiguration  

The runtime configuration  

Example:  

CancelRelease action  

runtimeConfiguration=TPZP  
releaseId=REL01  

CloseRelease action  

runtimeConfiguration=TPZP  
releaseId=REL02

  
  

**CreateAssignment action:**

**CreateRelease action:**

Required:

stream

ISPW stream name

application

ISPW application name

defaultPath

the default checkout path

description

the description for the assignment

assignmentPrefix

assignment prefix

Optional:

owner

the owner of the container

referenceNumber

reference number

releaseId

release ID

userTag

user tag

subAppl

ISPW sub application name

Example:

CreateAssignment

stream=PLAY  
application=PLAY  
subAppl=PLAY  
defaultPath=DEV2  
description=MyA01  
assignmentPrefix=PLAY

Required:

stream

ISPW stream name

application

ISPW application name

description

the description for the release

releaseId or releasePrefix  

either release ID or releasePrefix, but not both  

Optional:

owner

the owner of the container

referenceNumber

reference number

subAppl

The sub Application name

Example:

CreateRelease

stream=PLAY  
application=PLAY  
subAppl=PLAY  
releaseId=MyR01  
description=MyR01  
  
	

**  
DeployAssignment / DeployRelease actions (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId (DeployAsignment) or releaseId (DeployRelease)

The container for which you intend to deploy tasks.

level

All tasks in the container at this level will be generated

Optional:

mname

component with this name in the container will be deployed

mtype

component with this type in the container will be deployed

changeType

S for standard, I for incidental, or E for emergency. Default value of S

executionStatus

I for immediate execution or at start date/time, H to create request in hold

dpenvlst

the DPENVLST parameter

system

allows you to specify a specific System for the Deploy

deployAutomatically

The request parameters for the deploy will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step

Example:

DeployAssignment

DeployRelease

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=QA  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
releaseId=JKGENRELID  
level=QA  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
#optional if using a Git to ISPW Integration step  
DeployAutomatically=true  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
#optional if using a Git to ISPW Integration step  
deployautomatically=true  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

  
**  
DeployTask action (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId

The container for which you intend to deploy tasks.

level

The level that the tasks exist at in the assignment

taskId

The comma-separated list of task IDs for the tasks that need to be deployed

Optional:

deployAutomatically

The request parameters for the deploy will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step

changeType

S for standard, I for incidental, or E for emergency. Default value of S

executionStatus

I for immediate execution or at start date/time, H to create request in hold

dpenvlst

the DPENVLST parameter

system

allows you to specify a specific System for the Deploy

Example:

DeployTask

  

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=QA  
taskId=7E489457622C,7E4A2CAC742C  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
#optional if using a Git to ISPW Integration step  
deployautomatically=true  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

  
**GenerateTask action (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId

The container for which you intend to generate tasks.

level

The level that the tasks exist at in the assignment

taskId

The comma-separated list of task IDs for the tasks that need to be generated

Optional:

generateAutomatically

The request parameters for the generate will come from a file written to the Jenkins build directory. This option is only valid when used in combination with a Git to ISPW Integration step

changeType

S for standard, I for incidental, or E for emergency. Default value of S

executionStatus

I for immediate execution or at start date/time, H to create request in hold

autoDeploy

generates can be set up to automatically Deploy as well by an option set up by the ISPW. The default is to not use Auto Deploy. If the Auto Deploy option is set-up through ISPW, then you may use this option to automatically deploy instead of using the deployAutomatically option within the DeployTask/DeployAssignment/DeployRelease actions

Example:

GenerateTask

  

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=QA  
taskId=7E489457622C,7E4A2CAC742C  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
#optional if using a Git to ISPW Integration step  
generateautomatically=true  
autoDeploy=true  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Deployed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

  
**GenerateTasksInAssignment / GenerateTasksInRelease actions (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId (GenerateTasksInAssignment) or releaseId (GenerateTasksInRelease)

The container ID for which you intend to generate tasks.

level

All tasks in the container at this level will be generated

Optional:

mname

component with this name in the container will be generated

mtype

component with this type in the container will be generated

autoDeploy

generates can be set up to automatically Deploy as well by an option set up by the ISPW. The default is to not use Auto Deploy. If the Auto Deploy option is set-up through ISPW, then you may use this option to automatically deploy instead of using the deployAutomatically option within the DeployTask/DeployAssignment/DeployRelease actions

Example:

GenerateTasksInAssignment

GenerateTasksInRelease

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=DEV2  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Generated  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
releaseId=JKGENRELID  
level=DEV2  
#optional  
mname=TPROG08  
mtype=COB  
generateAutomatically=true  
autoDeploy=true  
#optional if use webhook callback in pipeline  
events.name=Completed  
events.body=Generated  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

  
**GetAssignmentInfo / GetAssignmentTaskList actions:**  
Required:

assignmentId

The assignment ID

level (GetAssignmentTaskList)

All tasks in the assignment at this level will be displayed

Example:

GetAssignmentInfo

GetAssignmentTaskList

assignmentId=PLAY000313

assignmentId=PLAY000313  
level=DEV2

  
**GetContainerList action:**  
Required: none  
Optional:  

application  

The ISPW application ID.  Trailing wildcards are supported, i.e. FOO\*  

subAppl  

The sub application.  Trailing wildcards are supported, i.e. FOO\*  

containerId  

The container ID (Assignment ID, Release ID or Set ID). Trailing wildcards are supported, i.e. PRFX0000\*  

containerType  

The type of container: A=Assignment, R=Release, S=Set  

description

The description for the container. Trailing wildcards are supported such as REF123\*  

includeClosedContainers  

Whether to include closed containers in the list.  Valid values are true or false (default)  

owner

The owner of the container. Trailing wildcards are supported, i.e. MYID\*  

path  

The default container path.  Trailing wildcards are supported, i.e. DEV\*  

refNumber  

Site defined number typically used to associate the container with a problem ticket number or change request number.  
Trailing wildcards are supported, i.e. MYISSUE\*  

releaseId  

The 10-character release number, if associated with an assignment. Trailing wildcards are supported, i.e. RELEASE1\*  

stream  

The ISPW stream name. Trailing wildcards are supported, i.e. BAR\*  

tag  

User-definable four-character field. Trailing wildcards are supported, i.e. TAG\* (Case sensitive)  

userId  

The owner or joined user for a container  

Example:

GetContainerList  

application=PLAY  
containerId=PLAY001386  
containerType=A  
description=myContainer  
includeClosedContainers=false  
owner=myUserId  
path=DEV1  
refNumber=JIRA1234  
releaseId=R00001234  
stream=PLAY  
subAppl=PLAY  
tag=ABCD  
userId=myUserId  

  
**GetReleaseTaskInfo / GetReleaseTaskGenerateListing / GetReleaseTaskList actions:**  
Required:

releaseId

The release ID

taskId (GetReleaseTaskInfo/GetReleaseTaskGenerateListing)

The task ID

level (GetReleaseTaskList)

All tasks in the release at this level will be displayed

Example:

GetReleaseTaskInfo

GetReleaseTaskGenerateListing

GetReleaseTaskList

releaseId=JKGENRELID  
taskId=7E1AC3D3DE25

releaseId=JKGENRELID  
taskId=7E1AC3D3DE25

releaseId=JKGENRELID  
level=DEV2

  
****GetSetInfo action:**  
Required:**

setId

The set ID you want info on

Example:

GetSetInfoAction

setId=S000015218

  
**GetSetTaskList action:**  
Required:

setId

The set ID you want info on

Example:

GetSetTaskList

setId=S000015218

**  
PromoteAssignment / PromoteRelease actions (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId (PromoteAssignment) or releaseId (PromoteRelease)

The container ID for which you intend to promote tasks.

level

All tasks in the release at this level will be generated

Optional:

mname

component with this name in the container will be promoted

mtype

component with this type in the container will be promoted

override  

override the higher version if  presented in the next level. Default to no override.  

changeType

optional, S for standard, I for incidental, or E for emergency. Default value of S.

executionStatus

I for immediate execution or at start date/time, H to create request in hold

autoDeploy

promotes can be set up to automatically Deploy as well by an option set up by the ISPW. The default is to not use Auto Deploy

Example:

PromoteAssignment

PromoteRelease

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=DEV2  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Complete  
events.body=Promoted  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
releaseId=JKGENRELID  
level=DEV2  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Complete  
events.body=Promoted  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

**  
FallbackAssignment / FallbackRelease actions (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId (FallbackAssignment) or releaseId (FallbackRelease)

The container ID for which you intend to fallback tasks.

level

All tasks in the container at this level will fallback

Optional:

mname

component with this name in the container will fallback

mtype

component with this type in the container will fallback

Example:

FallbackAssignment

FallbackRelease

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=DEV2  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Complete  
events.body=Fallback  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
releaseId=JKGENRELID  
level=DEV2  
#optional  
mname=TPROG08  
mtype=COB  
#optional if use webhook callback in pipeline  
events.name=Complete  
events.body=Fallback  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

  
**RegressAssignment / RegressRelease actions (Ignore 'events' properties if no webhook callback):**  
Required:

runtimeConfiguration

see ISPW administrator for valid values

assignmentId (RegressAsignment) or releaseId (RegressRelease)

The container for which you intend to regress the tasks

level

All tasks in the container at this level will be generated

Optional:

mname

component with this name in the container will be regressed

mtype

component with this type in the container will be regressed

changeType

S for standard, I for incidental, or E for emergency. Default value of S

executionStatus

I for immediate execution or at start date/time, H to create request in hold

Example:

RegressAssignment

RegressRelease

runtimeConfiguration=TPZP  
assignmentId=PLAY000313  
level=STG2  
#optional  
mname=TPROG08  
mtype=COB  
#optional, if use webhook callback in pipeline  
events.name=Completed  
events.body=Regressed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

runtimeConfiguration=TPZP  
releaseId=JKGENRELID  
level=STG2  
#optional  
mname=TPROG08  
mtype=COB  
#optional, if use webhook callback in pipeline  
events.name=Completed  
events.body=Regressed  
events.httpHeaders=Jenkins-Crumb:no-crumb  
events.credentials=admin:library

  
**TransferTask action:**  
Required:

assignmentId  

The assignment ID to move task from  

containerId  

The target container ID to move to  

containerType  

'A' or 'R'. A for assignment and R for release  

Optional:  

runtimeConfiguration  

The runtime configuration  

level  

All tasks at this level will be transferred  

mname  

The component name to be transferred  

mtype  

The component type to be transferred  

taskId  

The task ID to be transferred  

Example:

TransferTask

runtimeConfiguration=TPZP  
assignmentId=PLAY001386  
level=DEV1  
containerId=PLAY001387  
containerType=A  

  
**GetWorkList action:**  
Required: none  
Optional:  

inProgress  

True/false value indicating whether or not to include active tasks that are not in Production. The default value is true.  

production  

True/false value indicating whether or not to include current Production tasks. The default value is false.

historical  

True/false value indicating whether or not to include tasks that were once in Production. The default value is false.

startDate

Specify the start date in yyyy-mm-dd format to filter a range based on last update.

endDate  

Specify the end date in yyyy-mm-dd format to filter a range based on last update.

application

Container's primary application code. Containers may include components from multiple applications. Trailing wildcards are supported, i.e. FOO\*

sub application

Container's primary sub application code. Containers may include components from multiple applications. Trailing wildcards are supported, i.e. FOO\*

environment  

ISPW environment for this version (such as OUTS, TEST, HOLD, or PROD). Trailing wildcards are supported, i.e. PRO\*

group  

Component or task belonging to this application owner group. Trailing wildcards are supported, i.e. FOO\*

lastUpdatedBy  

User ID that requested the last significant operation (see Operation).

level  

Level of this component when the last operation was requested. Trailing wildcards are supported, i.e. DEV\*

name  

A component name (case sensitive). Trailing wildcards are supported, i.e. TPROG\*

operation  

Last operation performed on this component. Valid operation values include Browse, Checkout, Delete, Edit, Fallback, Generate, Implement, Loaded, Promote, Regress, Transfer, and Update Replace Version

owner  

User who performed the checkout of the component.

refNumber  

Optional, site-definable field typically used to associate the assignment with a problem ticket number or change request number. Trailing wildcards are supported, i.e. MYISSUE\*

releaseId  

Release a component belongs to. Trailing wildcards are supported, i.e. RELEASE1\*

stream  

2- to 8-character code defines the application structure with which the application is associated. Trailing wildcards are supported, i.e. BAR\*

type  

The one-to four-character acronym for the type of component, such as COB for a Cobol program or COPY for a copybook. Trailing wildcards are supported, i.e. C\*

Example:

GetWorkList  

inProgress=true  
production=true  
historical=true  
startDate=2019-01-01  
endDate=2019-03-31  
application=PLAY  
subAppl=PLAY  
environment=TEST  
group=GRP1  
lastUpdatedBy=FOOUSER  
level=DEV1  
name=TPROG01  
operation=Promote  
owner=FOOUSER  
refNumber=JIRA1234  
releaseId=RLS001  
stream=PLAY  
type=COB  

  
  
**RemoveFromRelease action:**  
Optional:  

level  

All tasks at this level will be removed  

mname  

The component name to be removed  

mtype  

The component type to be removed  

taskId  

The task ID to be removed  

Example:

RemoveFromRelease

releaseId=RLS123  
level=DEV1  
mname=TPROG01  
mtype=COB  
taskId=7E2BACADE42C  

  
**SetOperation action:**  
Required:  

setId  

the set ID  

action  

the action to be operated on the set,  
supported actions: hold, release, lock, unlock, delete, restart, terminate;  
or approve, deny, reset (approver must be provided)  

Optional:  

runtimeConfiguration  

the runtime configuration  

approver  

the approver name, must be provided if use action -  approve, deny, reset  

Example:  

SetOperation

runtimeConfiguration=TPZP  
action=deny  
approver=dummy  
setId=S000143423