import { offers } from '@/assets/assets'
import { Gift } from 'lucide-react'
import { Badge } from '../ui/badge'

const SpecialOffers = () => {
  return (
    <div><div className="border rounded-lg p-4 space-y-4">
    <h3 className="font-semibold flex items-center">
      <Gift className="h-5 w-5 mr-2" />
      Available Offers
    </h3>
    <div className="space-y-3">
      {offers.map((offer, idx) => (
        <div key={idx} className="flex items-start space-x-2">
          <Badge variant="outline" className="">{offer.type}</Badge>
          <div>
            <p className="text-sm text-foreground">{offer.description}</p>
            {offer.code && <p className="text-sm text-muted-foreground">Use code: {offer.code}</p>}
          </div>
        </div>
      ))}
    </div>
  </div></div>
  )
}

export default SpecialOffers