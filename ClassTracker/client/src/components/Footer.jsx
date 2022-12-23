import { CFooter } from "@coreui/react";
const Footer = () => {
  return (
    <CFooter fixed={false}>
        <div>
            <a href="#" target="_blank" rel="noopener noreferrer">Class Tracker</a>
            <span className="ms-1">&copy; 2022 Class Tracker</span>
        </div>
        <div className="mfs-auto">
            <span className="me-1">For:</span>
            <a href="https://codeforindia.com/" target="_blank" rel="noopener noreferrer">Code For India Foundation</a>
        </div>
    </CFooter>
  );
};

export default Footer;
