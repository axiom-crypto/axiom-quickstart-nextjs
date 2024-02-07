export default function CodeBox({children}:{children: React.ReactNode}) {
  return (
    <div className="flex flex-row items-center bg-lightgrey border-lightline border-[1px] px-4 py-3">
      <code className="text-sm font-mono text-dark">
        {children}
      </code>
    </div>
  )
}