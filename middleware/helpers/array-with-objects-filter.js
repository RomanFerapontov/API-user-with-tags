export default function filterArray(arrayOfObjects, filteredField) {
  const resultArray = []

  arrayOfObjects.forEach((object) => {
    const field = object[filteredField]
    if (!resultArray.includes(field)) {
      resultArray.push(object[filteredField])
    }
  })
  return resultArray
}
