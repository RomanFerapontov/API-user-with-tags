export default function findValueByField(array, field, value) {
  return array.find((el) => el[field] === value)
}
