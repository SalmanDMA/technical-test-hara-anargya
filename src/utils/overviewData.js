


const getCityListByProvinceId = (provinceId, citiesData) => {
 const cityData = citiesData.filter(city => city.provinsi_id === Number(provinceId));
 return cityData ? cityData : [];
}

const getProvinceNameByCityId = (cityId, provinceData) => {
 const province = provinceData.filter(province => province.wilayah_id === Number(cityId));
 return province ? province : [];
}

const sortProvinces = (provinces, sortBy = 'id', order) => {
 return provinces.sort((a, b) => {
  if (a[sortBy] < b[sortBy]) {
   return order === 'asc' ? -1 : 1;
  }
  if (a[sortBy] > b[sortBy]) {
   return order === 'asc' ? 1 : -1;
  }
  return 0;
 })
};


export { getCityListByProvinceId, getProvinceNameByCityId, sortProvinces };
