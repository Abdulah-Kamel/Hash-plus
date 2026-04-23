import fetch from 'node-fetch';

async function testFetch() {
  const res = await fetch("https://hashplus.app/new/api/v1/contents");
  const data = await res.json();
  console.log("Contents length:", data.data?.contents?.length || data.contents?.length || Object.keys(data).length);
  // Log the shape of the first item
  const first = data.data?.contents?.[0] || data.contents?.[0];
  console.log("First item:", first ? { _id: first._id, title: first.title, instructor: first.instructor } : "No item");
}
testFetch();
