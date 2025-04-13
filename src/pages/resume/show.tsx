import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Label from "../../components/text-field/label-field"
import Badge from "../../components/badge";
import { RESUME_STATUS } from "../../configs";

function ResumeShow() {
  const navigate = useNavigate();

  return (
    <div className="lg:flex block justify-between w-full gap-5">
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='flex items-center justify-between mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Resume Detail
          </h3>
          <div>
            <Badge color={RESUME_STATUS.INTERVIEWED as any} variant="solid" className="capitalize">
              {RESUME_STATUS.INTERVIEWED}
            </Badge>
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
              Position
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Senior FE Developer
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Application Date
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              2023-10-01
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Comments</Label>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 justify-end">
          <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>

      <div className="flex-1 mt-4 lg:mt-0 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='mb-3'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            CV
          </h3>
        </div>
        <div className="max-w-full overflow-x-auto">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90 capitalize">
            <a href="" className="text-blue-500 hover:underline">
              [FE] Nguyen Nhat Truong.pdf
            </a>
          </p>
        </div>
        <div className="mt-4">
          <img src="/resume/resume.png" alt="resume" />
      </div>
      </div>
    </div>
  ) 
}

export default ResumeShow