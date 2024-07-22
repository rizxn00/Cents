import { Button } from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Image from "next/image";
import Link from 'next/link';
import BackgroundImage from '@/assets/images/background_image.png'
import dashboard from '@/assets/images/dashboard_dark.png'
import expencetab from '@/assets/images/expence_tab.png'
import incometab from '@/assets/images/income_tab.png'
import phonemockup from '@/assets/images/phone_mockup.png'
import shape from '@/assets/svgs/shape.svg'


export default function Home() {

  const features = [
    {
      'label': 'Dashboard',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M20.5 15.8278C17.9985 21.756 9.86407 23.4835 5.20143 18.8641C0.629484 14.3347 2.04493 6.12883 8.05653 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.6831 12.5C19.5708 12.5 20.5146 12.5 21.1241 11.655C21.1469 11.6234 21.1848 11.5667 21.2052 11.5336C21.7527 10.6471 21.4705 9.966 20.9063 8.60378C20.3946 7.36853 19.6447 6.24615 18.6993 5.30073C17.7538 4.35531 16.6315 3.60536 15.3962 3.0937C14.034 2.52946 13.3529 2.24733 12.4664 2.79477C12.4333 2.81523 12.3766 2.85309 12.345 2.87587C11.5 3.4854 11.5 4.42922 11.5 6.31686V8.42748C11.5 10.3473 11.5 11.3072 12.0964 11.9036C12.6928 12.5 13.6527 12.5 15.5725 12.5H17.6831Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>)
    },
    {
      'label': 'Expenses',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.5 9.875C13.6716 9.875 13 10.4626 13 11.1875C13 11.9124 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.0876 16 13.8125C16 14.5374 15.3284 15.125 14.5 15.125M14.5 9.875C15.1531 9.875 15.7087 10.2402 15.9146 10.75M14.5 9.875V9M14.5 15.125C13.8469 15.125 13.2913 14.7598 13.0854 14.25M14.5 15.125V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>)
    },
    {
      'label': 'Income',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>)
    },
    {
      'label': 'Analytics',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M7 18V16M12 18V15M17 18V13M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.99219 11.4863C8.14729 11.5581 13.0341 11.2328 15.8137 6.82132M13.9923 6.28835L15.8678 5.98649C16.0964 5.95738 16.432 6.13785 16.5145 6.35298L17.0104 7.99142" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },
    {
      'label': 'Reports',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 20C6.07093 18.053 7.52279 13.0189 10.3063 13.0189C12.2301 13.0189 12.7283 15.4717 14.6136 15.4717C17.8572 15.4717 17.387 10 21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },
    {
      'label': 'Multi-Currency',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 16L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 8V6M13.5 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 18V16M13.5 18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.5 12H14.5C15.3284 12 16 12.6716 16 13.5V14.5C16 15.3284 15.3284 16 14.5 16H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8L14.5 8C15.3284 8 16 8.67157 16 9.5V10.5C16 11.3284 15.3284 12 14.5 12H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },
    {
      'label': 'Security',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M12 9C10.8954 9 10 9.67157 10 10.5C10 11.3284 10.8954 12 12 12C13.1046 12 14 12.6716 14 13.5C14 14.3284 13.1046 15 12 15M12 9C12.8708 9 13.6116 9.4174 13.8862 10M12 9V8M12 15C11.1292 15 10.3884 14.5826 10.1138 14M12 15V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>)
    },
    {
      'label': 'Export/Import',
      'image': (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="text-white dark:text-zinc-900" fill="none">
        <path d="M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 22C14.3932 21.4102 12 19.8403 12 19C12 18.1597 14.3932 16.5898 15 16M13 19H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },
  ]

  const details = [
    {
      id: '1',
      heading: 'Manage Your Finances Seamlessly',
      description: 'Easily add, edit, and categorize your expenses and income. Stay on top of your finances with an intuitive and user-friendly interface designed to make tracking your spending effortless.'
    },
    {
      id: '2',
      heading: 'Visualize Spending',
      description: 'Track your expenses with interactive charts and graphs that provide a clear overview of where your money goes each month.'
    },
    {
      id: '3',
      heading: 'Set Budgets',
      description: 'Define budgets for various categories and monitor your spending to ensure you stay within your financial goals.'
    },
    {
      id: '4',
      heading: 'Multi-Currency Support',
      description: 'Manage expenses and income in multiple currencies, with automatic conversions to your preferred currency.'
    },
    {
      id: '5',
      heading: 'Secure Data',
      description: 'Enjoy peace of mind with robust data encryption and secure storage, ensuring your financial information is always protected.'
    },
  ]

  return (
    <div>
      <nav className="bg-zinc-200 dark:bg-zinc-950 w-full top-0 left-0 bg-opacity-95 relative z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className='flex items-center'>
              Cents
            </div>
            <div className="gap-5 items-center hidden md:flex">
              <Label className='text-sm'>Home</Label>
              <Label className='text-sm'>About</Label>
              <Label className='text-sm'>Features</Label>
              <Label className='text-sm'>Contact</Label>
              <Link href={'auth/signin'}>
                <Button type="button" className='text-sm px-5'>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className=" h-[95dvh] flex justify-center items-center">
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 p-10 md:p-20">
            <div className='space-y-5'>
              <div className='flex flex-col gap-2'>
                <Label className="text-6xl font-extrabold">Cents.</Label><br />
                <Label className="text-6xl">The Expense Tracker</Label><br />
                <Label className="text-sm">Your personal expense tracker designed to help you manage your finances effortlessly and efficiently.</Label>
              </div>
              <div className='flex flex-col md:flex-row gap-2'>
                <button type="button" className="bg-black hover:bg-gray-950 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black px-20 p-2 rounded transition-all">Explore</button>
                <Link href={'auth/signup'}>
                  <Button type="button" className='w-full px-5'>Sign Up</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src={dashboard}
                alt='dashboard'
                className='hidden md:block border border-zinc-950 w-[800px] shadow-sm shadow-zinc-900 h-auto rounded-lg z-10 relative'
              />
              <Image
                src={incometab}
                alt='income tab'
                className='hidden md:block border border-zinc-950 w-[800px] shadow-sm shadow-zinc-900 h-auto rounded-lg absolute top-20 left-10'
              />
              <Image

                src={expencetab}
                alt='expence tab'
                className='hidden md:block border border-zinc-950 w-[800px] shadow-sm shadow-zinc-900 h-auto rounded-lg absolute -top-20 -left-10'
              />
            </div>
          </div>
        </div>
        <div className='bg-black dark:bg-zinc-300 p-10 grid grid-cols-2 md:grid-cols-4 justify-center gap-10 '>
          {features.map((item: any) => (
            <div className='flex flex-col gap-2 items-center hover:animate-pulse' key={item.label}>
              {item.image}
              <label className='text-md font-medium text-white dark:text-black'>{item.label}</label>
            </div>
          ))}
        </div>
        <div className='bg-gray-200 dark:bg-inherit flex gap-2 p-10 md:p-20'>
          <div className="space-y-8">
            {details.map((item: any) => (
              <div className="flex flex-col gap-2" key={item.id}>
                <Label>{item.heading}</Label>
                <Label className="text-xs tracking-wider font-light">{item.description}</Label>
              </div>
            ))}
            <Button type='button'>Sign Up Now !</Button>
          </div>

          <div>
            <Image
              src={phonemockup}
              alt='phonemockup'
              className='hidden lg:block border border-zinc-950 w-80 h-auto rounded-md relative hover:shadow-lg hover:shadow-zinc-950 transition ease-in-out'
            />
          </div>
        </div>
        <div className='bg-black dark:bg-zinc-300 flex justify-center items-center'>
          <label className='text-xl font-medium text-white dark:text-black'>Section 4</label>
        </div>
      </main>
    </div>

    // <main className="flex min-h-screen flex-col items-center justify-center p-24">
    //   Cents 💸
    // </main>
  );
}
