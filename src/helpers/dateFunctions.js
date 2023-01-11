export const formatDate = function (dateString) { 
  const ar = dateString.split('-')
  return ar[2] + '.' + ar[1] + '.' + ar[0]
}