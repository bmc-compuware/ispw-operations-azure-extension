
**Promote Assignment / Promote Release actions** 

Required:

|     |     |
| --- | --- |
| runtimeConfiguration | see ISPW administrator for valid values |
| assignmentId (PromoteAssignment) or releaseId (PromoteRelease) | The container ID for which you intend to promote tasks. |
| level | All tasks in the release at this level will be generated |

Optional:

|     |     |
| --- | --- |
| mname | component with this name in the container will be promoted |
| mtype | component with this type in the container will be promoted |
| override | override the higher version if  presented in the next level. Default to no override. |
| changeType | optional, S for standard, I for incidental, or E for emergency. Default value of S. |
| executionStatus | I for immediate execution or at start date/time, H to create request in hold |
| autoDeploy | promotes can be set up to automatically Deploy as well by an option set up by the ISPW. The default is to not use Auto Deploy |

Example:

|     |     |
| --- | --- |
| PromoteAssignment | PromoteRelease |
| runtimeConfiguration=TPZP  <br>assignmentId=PLAY000313  <br>level=DEV2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB |runtimeConfiguration=TPZP  <br>releaseId=JKGENRELID  <br>level=DEV2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB|


**Regress Assignment / Regress Release actions**  
Required:

|     |     |
| --- | --- |
| runtimeConfiguration | see ISPW administrator for valid values |
| assignmentId (RegressAsignment) or releaseId (RegressRelease) | The container for which you intend to regress the tasks |
| level | All tasks in the container at this level will be generated |

Optional:

|     |     |
| --- | --- |
| mname | component with this name in the container will be regressed |
| mtype | component with this type in the container will be regressed |
| changeType | S for standard, I for incidental, or E for emergency. Default value of S |
| executionStatus | I for immediate execution or at start date/time, H to create request in hold |

Example:

|     |     |
| --- | --- |
| RegressAssignment | RegressRelease |
| runtimeConfiguration=TPZP  <br>assignmentId=PLAY000313  <br>level=STG2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB  |runtimeConfiguration=TPZP <br>releaseId=JKGENRELID  <br>level=STG2  <br>#optional  <br>mname=TPROG08  <br>mtype=COB |