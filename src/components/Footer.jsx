function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="h-screen bg-gray-800">
      <div className=" container mx-auto">
        <div className="text-white">Hello</div>
        <div className="footerDivider my-4 bg-white"></div>
        <div>
          <div class="block text-gray-400">
            Copyright &copy; {footerYear}, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
