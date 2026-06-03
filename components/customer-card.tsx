import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Phone, Mail, Calendar } from 'lucide-react';
import type { Customer } from '@/lib/mock-data';

export function CustomerCard({ customer }: { customer: Customer }) {
  const statusStyles = {
    active: 'bg-green-100 text-green-800 hover:bg-green-100',
    inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  };

  const statusLabels = {
    active: 'فعال',
    inactive: 'غیرفعال',
    pending: 'در انتظار',
  };

  return (
    <Card className="overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow">
      {/* Header with status */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-25 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{customer.id}</p>
          </div>
          <Badge className={statusStyles[customer.status]}>
            {statusLabels[customer.status]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="size-4 text-blue-600" />
            <span className="text-gray-700 font-mono">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-blue-600" />
            <span className="text-gray-600 truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="size-4 text-blue-600" />
            <span className="text-gray-600">{customer.joinDate}</span>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            خودرو
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">برند و مدل:</span>
              <span className="text-sm font-semibold text-gray-900">
                {customer.vehicle.brand} {customer.vehicle.model}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">سال:</span>
              <span className="text-sm font-semibold text-gray-900">{customer.vehicle.year}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">رنگ:</span>
              <span className="text-sm font-semibold text-gray-900">{customer.vehicle.color}</span>
            </div>
            <div className="mt-2 bg-gray-50 rounded p-2 border border-gray-200">
              <p className="text-center text-sm font-bold text-gray-900 font-mono">
                {customer.vehicle.licensePlate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
