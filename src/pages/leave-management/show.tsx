import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { PATH } from "../../configs";

function LeavManagementShow() {
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Show Detail
          </h3>
        </div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <img src={'/images/user/user-14.jpg'} alt="User" width={80} height={80} />
          <div>
            <Button 
              size="ssm" 
              variant="primary" 
              className="mr-2" 
              onClick={() => navigate(PATH.EMPLOYEE_EDIT.replace(':id', "1"))}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Employee ID
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              edcf765c-82d3-4c06-8102
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Tonys
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Last Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Nguyen
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              tony@gmail.com
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Phone
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              +84 123 456 789
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Date of Birth
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              12/12/1990
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Birth Place
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Ho Chi Minh City
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Nationality
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Viet Nam
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Gender
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Male
            </p>
          </div>
        </div>

        <div className="w-full mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              123 Nguyen Trai, District 1, Ho Chi Minh City
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Country
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Viet Nam
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              State
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Ho Chi Minh City
            </p>
          </div>
        </div>

        <div className="w-full mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Bio
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Team Manager at ABC Company. Passionate about technology and software development.
            </p>
          </div>
        </div>

      </div>
    </>
  ) 
}

export default LeavManagementShow