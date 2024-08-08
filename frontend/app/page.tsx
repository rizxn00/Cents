'use client'

import { Button } from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Image from "next/image";
import Link from 'next/link';
import Logo from '@/assets/images/cents.png'
import mockup from '@/assets/images/mockup.png'
import { useEffect, useState } from "react";
import dashboard from '@/assets/images/dashboard.png'
import charts from '@/assets/images/charts.png'
import expense from '@/assets/images/expense.png'
import income from '@/assets/images/income.png'
import settings from '@/assets/images/settings.png'
import categories from '@/assets/images/categories.png'
import ClickOutside from "@/components/ClickOutside";


export default function Home() {

  useEffect(() => {
    const handleFadeUp = () => {
      const featureItems = document.querySelectorAll('.fadeup');
      featureItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          item.classList.add('animate-fadeInUp');
        }
      });
    };

    const handleSlideRight = () => {
      const featureItems = document.querySelectorAll('.slideright');
      featureItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          item.classList.add('animate-slideRight');
        }
      });
    };

    const handleSlideLeft = () => {
      const featureItems = document.querySelectorAll('.slideleft');
      featureItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          item.classList.add('animate-slideLeft');
        }
      });
    };

    window.addEventListener('scroll', handleFadeUp);
    window.addEventListener('scroll', handleSlideRight);
    window.addEventListener('scroll', handleSlideLeft);
    handleFadeUp();
    handleSlideRight();
    handleSlideLeft();


    return () => {
      window.removeEventListener('scroll', handleFadeUp);
      window.removeEventListener('scroll', handleSlideRight);
      window.removeEventListener('scroll', handleSlideLeft);
    }
  }, []);

  function disableDrawer() {
    const inputElement = document.getElementById('drawer-toggle') as HTMLInputElement
    if (inputElement) {
        inputElement.checked = false;
    }
}



  return (
    <div>
      <nav className="w-full fixed top-0 left-0 bg-opacity-95 backdrop-blur-sm z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
            <div className="md:hidden">
                <div className="fixed top-0 right-0 z-40 p-3">
                    <input type="checkbox" id="drawer-toggle" className="sr-only peer" />
                    <label htmlFor="drawer-toggle" className="cursor-pointer w-9 h-9 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white w-9 h-9" viewBox="0 0 24 24" fill="none">
                            <path d="M4 8.5L20 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 15.5L20 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </label>
                    <div className="fixed top-0 right-0 z-50 w-80 min-h-screen transition-transform duration-500 translate-x-full  bg-neutral-300 dark:bg-zinc-950 shadow-xl peer-checked:translate-x-0">
                        <ClickOutside onClick={disableDrawer}>
                            <div className="px-2 py-4 flex flex-col justify-between h-full">
                                <button onClick={disableDrawer} className="absolute top-4 right-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white w-6 h-6" viewBox="0 0 24 24" fill="none">
                                        <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <div className="mt-10 flex-1">
                                    <ul className="flex flex-col space-y-5">
                                      <a href="#home" className="w-full flex justify-center p-2 rounded-lg" onClick={disableDrawer}>
                                        <Label className='text-sm cursor-pointer'>Home</Label>
                                      </a>
                                      <a href="#about" className="w-full flex justify-center p-2 rounded-lg" onClick={disableDrawer}>
                                        <Label className='text-sm cursor-pointer'>About</Label>
                                      </a>
                                      <a href="#contact"  className="w-full flex justify-center p-2 rounded-lg" onClick={disableDrawer}>
                                        <Label className='text-sm cursor-pointer'>Contact</Label>
                                      </a>
                                      <Link href={'auth/signin'} className="w-full flex justify-center rounded-lg">
                                        <button type="button" className='text-sm w-full text-white p-2 rounded-md bg-orange-800'>Login</button>
                                      </Link>
                                    </ul>
                                </div>
                            </div>
                        </ClickOutside>
                    </div>
                </div>
            </div>
            </div>
            <div className='flex items-center'>
              <a href="#home">
                <Image src={Logo} alt="logo" priority className="w-8 md:w-8 h-auto invert dark:invert-0" />
              </a>
            </div>
            <div className="gap-5 items-center hidden md:flex">
              <a href="#home">
                <Label className='text-sm'>Home</Label>
              </a>
              <a href="#about">
                <Label className='text-sm'>About</Label>
              </a>
              <a href="#contact">
                <Label className='text-sm'>Contact</Label>
              </a>
              <Link href={'auth/signin'}>
                <Button type="button" className='text-sm px-5'>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div id="home" className="h-screen flex justify-center items-center p-10">
          <div className='space-y-5'>
            <div className='flex flex-col gap-2'>
              <Label className="text-6xl font-extrabold animate-slideRight">Cents.</Label><br />
              <Label className="text-4xl animate-slideRight">The Expense Tracker</Label><br />
              <Label className="text-sm font-light animate-slideRight">Your personal expense tracker designed to help you manage your finances effortlessly and efficiently.</Label>
            </div>
            <div className='flex flex-col md:flex-row gap-2 animate-slideRight'>
              <a href="#explore">
                <button type="button" className="w-full bg-black hover:bg-gray-950 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black px-20 p-2 rounded transition-all">Explore</button>
              </a>
              <Link href={'auth/signup'}>
                <Button type="button" className='w-full px-5'>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>

        <section id="explore" className="py-16">
          <div className="mx-auto px-6 max-w-6xl">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <div id="details" className="slideright relative overflow-hidden rounded-xl border border-neutral-950 aspect-video shadow-lg md:col-span-2 group">
                <Image src={dashboard} alt="Visualization" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0  bg-gradient-to-b from-black/75 to-transparent"></div>
                <h3 className="absolute top-4 left-4 text-sm opacity-80 font-semibold text-white">Dashboard</h3>
              </div>
              <div className="grid gap-6">
                <div className="slideleft relative overflow-hidden rounded-xl border border-neutral-950 aspect-video shadow-lg group">
                  <Image src={charts} alt="Dashboard" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  <div className="absolute inset-0  bg-gradient-to-b from-black/75 to-transparent"></div>
                  <h3 className="absolute top-4 left-4 text-sm opacity-80 font-semibold text-white">Visualization</h3>
                </div>
                <div className="slideleft relative overflow-hidden rounded-xl border border-neutral-950 aspect-video shadow-lg group">
                  <Image src={categories} alt="Categories" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  <div className="absolute inset-0  bg-gradient-to-b from-black/75 to-transparent"></div>
                  <h3 className="absolute top-4 left-4 text-sm opacity-80 font-semibold text-white">Categorizations</h3>
                </div>
              </div>
              <div id="details" className="slideright relative overflow-hidden rounded-xl border border-neutral-950 aspect-video shadow-lg group">
                <Image src={income} alt="Income" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0  bg-gradient-to-b from-black/75 to-transparent"></div>
                <h3 className="absolute top-4 left-4 text-sm opacity-80 font-semibold text-white">Income Management</h3>
              </div>

              <div className="slideleft relative overflow-hidden rounded-xl border border-neutral-950 aspect-video shadow-lg group">
                <Image src={expense} alt="Expense" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0  bg-gradient-to-b from-black/75 to-transparent"></div>
                <h3 className="absolute top-4 left-4 text-sm opacity-80 font-semibold text-white">Expense Management</h3>
              </div>
              <div id="features" className="slideleft relative overflow-hidden rounded-xl border border-neutral-950 aspect-video shadow-lg group">
                <Image src={settings} alt="Expense" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0  bg-gradient-to-b from-black/75 to-transparent"></div>
                <h3 className="absolute top-4 left-4 text-sm opacity-80 font-semibold text-white">Import/Upload Data</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 px-5 ">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cents?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
              <div className="p-6 rounded-lg shadow-md fadeup">
                <h3 className="text-xl font-medium mb-4">Manage Your Finances</h3>
                <p className="font-light text-sm">Effortlessly manage and categorize your expenses and income with an intuitive, user-friendly interface that simplifies financial tracking.</p>
              </div>
              <div className="p-6 rounded-lg shadow-md fadeup">
                <h3 className="text-xl font-medium mb-4">Visualize Spending</h3>
                <p className="font-light text-sm">Track your expenses with interactive charts and graphs that provide a clear overview of where your money goes each month.</p>
              </div>
              <div className="p-6 rounded-lg shadow-md fadeup">
                <h3 className="text-xl font-medium mb-4">Multi-Currency Support</h3>
                <p className="font-light text-sm">Manage expenses and income in multiple currencies, ability to change your currency according to your preference.</p>
              </div>
              <div className="p-6 rounded-lg shadow-md fadeup">
                <h3 className="text-xl font-medium mb-4">Secure Data</h3>
                <p className="font-light text-sm">Enjoy peace of mind with robust data encryption and secure storage, ensuring your financial information is always protected.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <Image src={Logo} alt="logo" className="w-12 h-auto mb-4 invert dark:invert-0" />
            </div>
            <div className="flex space-x-5 items-center">
              <a href="https://github.com/rizxn00">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none">
                  <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://x.com/rizxn_00">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none">
                  <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://www.instagram.com/rizxn00">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none">
                  <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
            <Label>&copy; 2024 Cents. All rights reserved.</Label>
          </div>
        </div>
      </footer>

      
    </div>
  );
}
