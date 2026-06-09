import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // اینجا فقط دیتا رو آماده می‌کنیم
    const receipt = {
      customer: body.customer,
      service: body.service,
      price: body.price,
      time: new Date().toISOString(),
    };

    // فعلاً فقط لاگ می‌کنیم (مرحله بعد وصل به پرینتر)
    console.log("PRINT JOB:", receipt);

    return NextResponse.json({
      success: true,
      message: "Print job created",
      data: receipt,
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Print failed" },
      { status: 500 }
    );
  }
}