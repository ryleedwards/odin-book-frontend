type OdinBookLogoProps = {
  className?: string;
};

const OdinBookLogo = ({ className }: OdinBookLogoProps) => {
  return (
    <div className={className}>
      <img src='src/assets/Odinbook-Logo.svg' alt='odin-logo' />
    </div>
  );
};

export default OdinBookLogo;
