const SectionHeader = ({ Icon, title }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Icon className="h-7 w-7 text-blue-600" />
      <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
