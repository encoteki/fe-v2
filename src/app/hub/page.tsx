import URL_ROUTES from '@/shared/constants/urlRoute'
import { redirect } from 'next/navigation'

export default function Apps() {
  redirect(URL_ROUTES.MINT)
}
