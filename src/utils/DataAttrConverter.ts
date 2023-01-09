const DataAttrConverter = {
  encode(attribute: string): string {
    return attribute.replaceAll(' ', '_');
  },
  decode(attribute: string): string {
    return attribute.replaceAll('_', ' ');
  },
};

export default DataAttrConverter;
