let activeSortField = null;
let activeSortDirection = 'asc';
let previousHeader = null;
const trackHeaderPrefix = 'buk-track-';
const trackHeaderColClass = 'bucket-track-header-col';
const trackHeaderClass = 'bucket-track-header';
const trackNumberField = `${trackHeaderPrefix}num`;
const sortTracks = (sortField) => {
  const tracks = document.querySelectorAll('.bucket.tracks .bucket-item');
  if (sortField === activeSortField) {
    if (activeSortDirection === 'asc') {
      activeSortDirection = 'des';
    } else {
      activeSortDirection = 'asc';
    }
  } else {
    activeSortDirection = 'asc';
  }
  Array.from(tracks).sort((trackA, trackB) => {
    const trackAText = trackA.querySelector(`.${sortField}`).innerText;
    const trackBText = trackB.querySelector(`.${sortField}`).innerText
    if (sortField === trackNumberField) {
      if (activeSortDirection === 'asc') {
        return trackAText - trackBText;
      }

      return trackAText - trackAText;
    }
    if (activeSortDirection === 'asc') {
      return trackAText.localeCompare(trackBText);
    }

    return trackBText.localeCompare(trackAText);
  }).forEach(track => {
    document.querySelector('.bucket.tracks .bucket-items').appendChild(track)
  });
  window.scrollBy(0, 1)
  window.scrollBy(0, -1)
  activeSortField = sortField;
}

document.addEventListener('click', evt => {
  let actionTaken = false;
  if (evt.target.classList.contains(trackHeaderColClass)) {
    const sortField = Array.from(
      evt.target.classList
    ).find(className => className.startsWith(trackHeaderPrefix));
    sortTracks(sortField);
    actionTaken = true;
  }
  if (evt.target.classList.contains(trackHeaderClass)) {
    sortTracks(trackNumberField);
    actionTaken = true;
  }

  if (actionTaken) {
    if (previousHeader) {
      previousHeader.style.fontWeight = '';
    }

    evt.target.style.fontWeight = 'bold';
    previousHeader = evt.target;
  }
})
