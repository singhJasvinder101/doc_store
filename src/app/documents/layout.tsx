interface DocumentsLayoutProps {
  children: React.ReactNode
}
const layout = ({ children }: DocumentsLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout
