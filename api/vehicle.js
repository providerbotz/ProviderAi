export default async function handler(req, res) {

  const rc = req.query.rc;

  if (!rc) {
    return res.status(400).json({
      status: "error",
      message: "RC number required",
      example: "/api/vehicle?rc=MH14KK9159"
    });
  }

  try {

    const api = await fetch(`https://cyber-api-pack.vercel.app/vehicle?key=CYBER_FREE&rc=${rc}`);
    const data = await api.json();

    const src = data?.results?.result?.source1?.data?.data?.[0] || {};
    const src5 = data?.results?.result?.source5 || {};
    const src7 = data?.results?.result?.source7?.address || {};

    const response = {
      status: "success",
      developer: "@LazyProvider",
      vehicle_number: rc,

      vehicle_details: {
        owner_name: src5.owner_name || "NA",
        father_name: src5.father_name || "NA",
        vehicle_model: src.maker_modal || "NA",
        manufacturer: src.maker || "NA",
        vehicle_class: src.vh_class || "NA",
        vehicle_type: src7.vehicle_type || "NA",
        fuel_type: src.fuel_type || "NA",
        fuel_norms: src.fuel_norms || "NA",
        color: src.vehicle_color || "NA",
        engine_capacity: src.cubic_cap ? src.cubic_cap + " CC" : "NA",
        weight: src.vehicle_weight ? src.vehicle_weight + " KG" : "NA"
      },

      registration_details: {
        registration_number: src.reg_no || rc,
        registration_date: src.regn_dt || "NA",
        registered_rto: src.rto || "NA",
        vehicle_age: src.vehicle_age || "NA"
      },

      insurance_details: {
        company: src.insurance_comp || "NA",
        insurance_expiry: src.insUpto || "NA"
      },

      fitness_details: {
        fitness_upto: src.fitness_upto || "NA"
      },

      pollution_details: {
        puc_upto: src.puc_upto || "NA"
      },

      owner_address: {
        city: src5.city || "NA",
        state: "Maharashtra",
        address: src7.present_address || src5.address || "NA"
      },

      additional_info: {
        resale_value: src.resale_value || "NA",
        vehicle_status: src.status || "NA"
      }
    };

    res.status(200).json(response);

  } catch (error) {

    res.status(500).json({
      status: "error",
      developer: "@LazyProvider",
      message: "Vehicle lookup failed"
    });

  }

          }
