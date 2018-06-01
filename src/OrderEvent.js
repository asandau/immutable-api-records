import Immutable, {List, Map, Record} from 'immutable'

import { LineItemShipping } from './ShippingProcess'
import { LineItemsCanceled } from './CancelProcess'
import Link from './Link'
import SimplePrice from './SimplePrice'

const OrderEventCreatedDetailsRecord = new Record({
  type: null
})
export class OrderEventCreatedDetails extends OrderEventCreatedDetailsRecord {
}

const OrderEventShippingShippedDetailsRecord = new Record({
  type: null,
  trackingLink: null,
  lineItems: null,
  shippingProcessId: null
})
export class OrderEventShippingShippedDetails extends OrderEventShippingShippedDetailsRecord {
  constructor (orderEventShippingShippedDetails) {
    const immutable = Immutable.fromJS(orderEventShippingShippedDetails || {})
    const parsed = immutable.update(
      'lineItems',
      lis => (lis ? lis.map(li => new LineItemShipping(li)) : new List())
    )

    super(parsed)
  }
}

const OrderEventShippingPendingDetailsRecord = new Record({
  type: null,
  trackingLink: null,
  lineItems: null,
  shippingProcessId: null
})
export class OrderEventShippingPendingDetails extends OrderEventShippingPendingDetailsRecord {
  constructor (orderEventShippingPendingDetails) {
    const immutable = Immutable.fromJS(orderEventShippingPendingDetails || {})
    const parsed = immutable.update(
      'lineItems',
      lis => (lis ? lis.map(li => new LineItemShipping(li)) : new List())
    )

    super(parsed)
  }
}

var OrderEventItemsCanceledDetailsRecord = new Record({
  type: null,
  lineItems: null
})
export class OrderEventItemsCanceledDetails extends OrderEventItemsCanceledDetailsRecord {
  constructor (orderEventItemsCanceledDetails) {
    const immutable = Immutable.fromJS(orderEventItemsCanceledDetails || {})
    const parsed = immutable.update('lineItems', lis => (lis ? lis.map(li => new LineItemsCanceled(li)) : new List()))
    super(parsed)
  }
}

const OrderEventPaymentCreatedDetailsRecord = new Record({
  type: null,
  amount: null,
  paymentProcessId: null
})
export class OrderEventPaymentCreatedDetails extends OrderEventPaymentCreatedDetailsRecord {
  constructor (orderEventPaymentCreatedDetails) {
    const immutable = Immutable.fromJS(orderEventPaymentCreatedDetails || {})
    const parsed = immutable
      .update('amount', (a) => a && new SimplePrice(a))

    super(parsed)
  }
}

const OrderEventRefundCreatedDetailsRecord = new Record({
  type: null,
  amount: null,
  refundProcessId: null
})
export class OrderEventRefundCreatedDetails extends OrderEventRefundCreatedDetailsRecord {
  constructor (orderEventRefundCreatedDetails) {
    const immutable = Immutable.fromJS(orderEventRefundCreatedDetails || {})
    const parsed = immutable
      .update('amount', (a) => a && new SimplePrice(a))

    super(parsed)
  }
}

const OrderEventRefundPaidDetailsRecord = new Record({
  type: null,
  amount: null,
  refundProcessId: null
})
export class OrderEventRefundPaidDetails extends OrderEventRefundPaidDetailsRecord {
  constructor (orderEventRefundPaidDetails) {
    const immutable = Immutable.fromJS(orderEventRefundPaidDetails || {})
    const parsed = immutable
    .update('amount', (a) => a && new SimplePrice(a))

    super(parsed)
  }
}

const OrderEventPaymentPaidDetailsRecord = new Record({
  type: null,
  amount: null,
  paymentProcessId: null
})
export class OrderEventPaymentPaidDetails extends OrderEventPaymentPaidDetailsRecord {
  constructor (orderEventPaymentPaidDetails) {
    const immutable = Immutable.fromJS(orderEventPaymentPaidDetails || {})
    const parsed = immutable
    .update('amount', (a) => a && new SimplePrice(a))

    super(parsed)
  }
}

const OrderEventPaymentVoidedDetailsRecord = new Record({
  type: null,
  paymentProcessId: null
})
export class OrderEventPaymentVoidedDetails extends OrderEventPaymentVoidedDetailsRecord {
}

const OrderEventUnknownDetailsRecord = new Record({
  type: null
})
export class OrderEventUnknownDetails extends OrderEventUnknownDetailsRecord {
}

const OrderEventRecord = new Record({
  triggeredBy: null,
  comment: null,
  details: null,
  createdAt: null,
  _links: null,
  _embedded: new Map()
})
export default class OrderEvent extends OrderEventRecord {
  constructor (orderEvent) {
    const immutable = Immutable.fromJS(orderEvent || {})
    const parsed = immutable
      .update('details', (d) => {
        if (!d) return null

        switch (d.get('type')) {
          case 'items-canceled' : return new OrderEventItemsCanceledDetails(d)
          case 'order-created': return new OrderEventCreatedDetails(d)
          case 'payment-created': return new OrderEventPaymentCreatedDetails(d)
          case 'payment-paid': return new OrderEventPaymentPaidDetails(d)
          case 'refund-created': return new OrderEventRefundCreatedDetails(d)
          case 'refund-paid': return new OrderEventRefundPaidDetails(d)
          case 'payment-voided': return new OrderEventPaymentVoidedDetails(d)
          case 'shipping-pending': return new OrderEventShippingPendingDetails(d)
          case 'shipping-shipped': return new OrderEventShippingShippedDetails(d)
          default: return new OrderEventUnknownDetails(d)
        }
      })
      .update('_links', (ls) => ls ? ls.map((l) => new Link(l)) : new Map())

    super(parsed)
  }
}
