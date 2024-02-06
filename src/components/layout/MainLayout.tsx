import { classes } from "@/lib/utils"
import Footer from "./Footer"


{/* <div className={classes(
  "flex flex-col justify-center items-center px-4",
  "w-full sm:w-[40rem] lg:w-[64rem]"
)}
>
  <div className={classes(
    "flex flex-col justify-center items-center w-full min-h-[40vh]",
    "mt-10 px-8 py-4 border-[1px] border-darkgrey gap-8 shadow-md",
  )}
  >
    {children}
  </div>
</div> */}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-screen min-h-screen justify-between items-center">
      <div className="flex flex-grow w-full justify-center items-center">
        <div className="flex flex-col w-full h-full justify-center items-center gap-4">
          {children}
        </div>
      </div>
      <div className="flex flex-col justify-end h-20">
        <Footer />
      </div>
    </div>
  )
}