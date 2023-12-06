export const getNextValueFromRangeMap = (value, rangeMap) => {
  const inRange = rangeMap.find(
    ([, sourceStart, length]) =>
      sourceStart <= value && sourceStart + length >= value,
  )
  if (!inRange) return value
  return inRange[0] + (value - inRange[1])
}
export default ({
  seedStart,
  length,
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerToWaterMap,
  waterToLightMap,
  lightToTemperatureMap,
  temperatureToHumidityMap,
  humidityToLocationMap,
  port,
}) => {
  let smallestLocation = Infinity
  for (let i = seedStart; i < seedStart + length; i++) {
    const soil = getNextValueFromRangeMap(i, seedToSoilMap)
    const fertilizer = getNextValueFromRangeMap(soil, soilToFertilizerMap)
    const water = getNextValueFromRangeMap(fertilizer, fertilizerToWaterMap)
    const light = getNextValueFromRangeMap(water, waterToLightMap)
    const temperature = getNextValueFromRangeMap(light, lightToTemperatureMap)
    const humidity = getNextValueFromRangeMap(
      temperature,
      temperatureToHumidityMap,
    )
    const location = getNextValueFromRangeMap(humidity, humidityToLocationMap)
    if (location < smallestLocation) smallestLocation = location
    if (i % 500000 === 0) port.postMessage(500000)
  }
  return smallestLocation
}
