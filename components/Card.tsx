type CardProps = {
  title: string
  subtitle: string
  description: string
  price: string
  duration: string
  level: string
  session: number
  meetings: number
}

const Card = ({
  title,
  subtitle,
  description,
  price,
  duration,
  level,
  session,
  meetings
}: CardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-brand-primary">
          {title}
        </h3>
        <h3 className="mt-2 text-gray-800 font-semibold">
          {subtitle}
        </h3>


        <p className="mt-2 text-sm text-gray-600">
          {description}
        </p>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Level:</span> {level}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {duration}
        </p>
        <p>
          <span className="font-medium">{session} mins/session</span>
        </p>
        <p>
          <span className="font-medium">{meetings} meetings/month</span>
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold text-gray-900">
          {price}
        </p>

        <button className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
          Register
        </button>
      </div>
    </div>
  )
}

export default Card