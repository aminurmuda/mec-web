import ButtonCTA from "./Button"

type CardProps = {
  title: string
  subtitle: string
  description: string
  price: string
  duration: string
  level: string
  pax: number
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
  pax,
  session,
  meetings
}: CardProps) => {
  return (
    <div className="flex flex-col justify-between h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition transform lg:hover:shadow-md lg:hover:scale-105">
      <div>
        <h3 className="text-xl font-bold text-brand-primary">
          {title}
        </h3>
        <h3 className="text-gray-800 font-semibold">
          {subtitle}
        </h3>

        <div className="mt-6"> 
            <p className="text-xl font-bold text-gray-900">
            {price}/{pax > 1 ? pax + ' months' : 'month'}
            </p>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          {description}
        </p>

        <div className="space-y-1 text-sm text-gray-600 mt-4">
          <p>
            <span className="font-medium">Level:</span> {level}
          </p>
          <p>
            <span className="font-medium">Duration:</span> {duration}
          </p>
          <p>
            <span className="font-medium">Session:</span> {session} mins
          </p>
          <p>
            {meetings} meetings/month
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <ButtonCTA fullWidth>
          Register
        </ButtonCTA>
      </div>
    </div>
  )
}

export default Card