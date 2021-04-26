import Link from 'next/link'

export default function IndexPage() {
  return (
    <div>
      Hello World.
      <br/>
      <Link href="/my-videos">
        <a>My Videos</a>
      </Link>
    </div>
  )
}
