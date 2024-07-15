import BackgroundImage from '@/assets/images/background_image.png'
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <header className="flex justify-evenly p-5">
        <div className='flex items-center'>
          Cents
        </div>
        <div className="flex gap-5 items-center">
          <Label className='text-sm'>Home</Label>
          <Label className='text-sm'>About</Label>
          <Label className='text-sm'>Features</Label>
          <Label className='text-sm'>Contact</Label>
          <Button type="button" className='text-sm'>Sign Up</Button>
        </div>
      </header>
      <div className="bg-white h-screen p-5 flex justify-center items-center md:p-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className='space-y-5'>
            <div className='flex flex-col gap-2'>

              <Label className="text-6xl">Cents.</Label><br />
              <Label className="text-6xl">The Expense Tracker</Label><br />
              <Label className="text-sm">Say goodbye to the hassle of manual expense management and embrace this webapp</Label>
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
              <button type="button" className="bg-black text-white px-10 p-2 rounded-lg">Explore</button>
              <Button type="button">Sign Up</Button>
            </div>
          </div>
          <div>
            <Image src={BackgroundImage} alt='image' className='w-[500px] h-auto rounded-lg   ' />
          </div>
        </div>
      </div>
      <div className='bg-black h-32 flex justify-center items-center'>
        <Label className='text-xl text-white'>Section 2</Label>
      </div>
      <div className='bg-white h-32 flex justify-center items-center'>
        <Label className='text-xl text-black'>Section 3</Label>
      </div>
      <div className='bg-black h-32 flex justify-center items-center'>
        <Label className='text-xl text-white'>Section 4</Label>
      </div>
    </div>
    // <main className="flex min-h-screen flex-col items-center justify-center p-24">
    //   Cents 💸
    // </main>
  );
}
