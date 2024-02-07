export default function Title({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="text-lg sm:text-xl lg:text-3xl text-midtone font-bold text-center">
      {children}
    </div>
  )
}