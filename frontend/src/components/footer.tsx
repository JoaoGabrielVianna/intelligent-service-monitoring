function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8">
        <div className="container mx-auto p-4 text-center text-sm text-gray-600 dark:text-gray-400">
          SiteMonitor &copy; {new Date().getFullYear()} - Todos os direitos reservados
        </div>
      </footer>
  );
}
export default Footer;