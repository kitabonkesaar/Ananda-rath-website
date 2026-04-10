import Navbar from "@/components/Navbar";
import PackageDetail from "@/components/PackageDetail";
import WhatsAppButton from "@/components/WhatsAppButton";

const PackagePage = () => (
  <>
    <Navbar />
    <PackageDetail />
    <WhatsAppButton variant="floating" />
  </>
);

export default PackagePage;
